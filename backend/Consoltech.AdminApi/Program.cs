// Consoltech Admin API - Backend Service
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Consoltech.AdminApi.Data;
using Consoltech.AdminApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure for Azure App Service
// Azure automatically handles port binding via PORT environment variable
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME")))
{
    // Running on Azure App Service
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}
else
{
    // Local development
    builder.WebHost.UseUrls($"http://localhost:{port}");
}

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure SQLite Database
var dbPath = Path.Combine(builder.Environment.ContentRootPath, "AppData", "products.db");
var dbDirectory = Path.GetDirectoryName(dbPath);
if (!Directory.Exists(dbDirectory))
{
    Directory.CreateDirectory(dbDirectory!);
}

builder.Services.AddDbContext<ProductsDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

// Register Local Storage service (always available for development/fallback)
builder.Services.AddSingleton<LocalStorageService>();

// Conditionally register Azure Storage services only if real Azure configuration is present
// Skip for development mode using "UseDevelopmentStorage=true"
var azureConnectionString = builder.Configuration["AzureStorage:ConnectionString"];
if (!string.IsNullOrEmpty(azureConnectionString) && azureConnectionString != "UseDevelopmentStorage=true")
{
    // Register Azure services only when real Azure connection string is provided
    builder.Services.AddSingleton<BlobStorageService>();
    builder.Services.AddSingleton<TableStorageService>();
}

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey not configured");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

builder.Services.AddAuthorization();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://consoltech-admin-windows-fbcphwasbuddgpas.westeurope-01.azurewebsites.net",
            "https://consoltech-admin.azurewebsites.net",
            "https://consoltech.shop",
            "https://www.consoltech.shop",
            "http://localhost:5173",
            "https://localhost:5173",
            "http://localhost:8080",
            "https://localhost:8080"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});


var app = builder.Build();

// Initialize database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ProductsDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline
// Swagger MUST be enabled always (development + production)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Consoltech API V1");
    c.RoutePrefix = "swagger";
});

// Serve static files (for uploaded images and warranty invoices)
app.UseStaticFiles();

// Serve warranty uploads from AppData/warranty-uploads
var warrantyUploadsPath = Path.Combine(builder.Environment.ContentRootPath, "AppData", "warranty-uploads");
if (!Directory.Exists(warrantyUploadsPath))
{
    Directory.CreateDirectory(warrantyUploadsPath);
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(warrantyUploadsPath),
    RequestPath = "/warranty-uploads"
});

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
