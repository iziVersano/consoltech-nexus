using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Consoltech.AdminApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarrantyController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<WarrantyController> _logger;
    private readonly HttpClient _httpClient;

    public WarrantyController(
        IConfiguration configuration,
        ILogger<WarrantyController> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _httpClient = new HttpClient();
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterWarranty(
        [FromForm] string fullName,
        [FromForm] string email,
        [FromForm] string phone,
        [FromForm] string productModel,
        [FromForm] string serialNumber,
        [FromForm] string purchaseDate,
        [FromForm] IFormFile invoice)
    {
        // Validate required fields
        if (string.IsNullOrWhiteSpace(fullName) || 
            string.IsNullOrWhiteSpace(email) || 
            string.IsNullOrWhiteSpace(phone) ||
            string.IsNullOrWhiteSpace(serialNumber) || 
            string.IsNullOrWhiteSpace(purchaseDate))
        {
            return BadRequest(new { success = false, message = "All fields are required" });
        }

        // Validate file
        if (invoice == null || invoice.Length == 0)
        {
            return BadRequest(new { success = false, message = "Invoice file is required" });
        }

        var allowedTypes = new[] { "application/pdf", "image/jpeg", "image/png" };
        if (!allowedTypes.Contains(invoice.ContentType.ToLower()))
        {
            return BadRequest(new { success = false, message = "Invalid file type. Only PDF, JPG, PNG allowed." });
        }

        if (invoice.Length > 5 * 1024 * 1024)
        {
            return BadRequest(new { success = false, message = "File size exceeds 5MB limit" });
        }

        try
        {
            // Read file into memory for email attachment
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await invoice.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            // Send email with Resend
            await SendWarrantyEmailWithResend(fullName, email, phone, productModel, serialNumber, purchaseDate, fileBytes, invoice.FileName);

            _logger.LogInformation("Warranty registration submitted: {Email}, {SerialNumber}", email, serialNumber);

            return Ok(new { success = true, message = "Warranty registration submitted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process warranty registration");
            return StatusCode(500, new { success = false, message = "Failed to process warranty registration" });
        }
    }

    private async Task SendWarrantyEmailWithResend(
        string fullName, string email, string phone,
        string productModel, string serialNumber, string purchaseDate,
        byte[] attachmentBytes, string originalFileName)
    {
        var resendApiKey = _configuration["Resend:ApiKey"];
        var toEmail = _configuration["Resend:WarrantyRecipient"] ?? "support@consoltech.shop";
        var fromEmail = _configuration["Resend:FromEmail"] ?? "no-reply@consoltech.shop";

        if (string.IsNullOrEmpty(resendApiKey))
        {
            _logger.LogWarning("Resend API key not configured, skipping email send");
            return;
        }

        var emailBody = $@"
            <h2>רישום אחריות חדש / New Warranty Registration</h2>
            <table style='border-collapse: collapse; direction: rtl;'>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>שם מלא:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{fullName}</td></tr>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>אימייל:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{email}</td></tr>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>טלפון:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{phone}</td></tr>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>דגם המוצר:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{productModel}</td></tr>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>מספר סידורי:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{serialNumber}</td></tr>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>תאריך רכישה:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{purchaseDate}</td></tr>
            </table>
            <p><strong>החשבונית מצורפת למייל זה.</strong></p>
        ";

        var payload = new
        {
            from = fromEmail,
            to = new[] { toEmail },
            subject = $"Warranty Registration – {productModel}",
            html = emailBody,
            reply_to = email,
            attachments = new[]
            {
                new
                {
                    filename = originalFileName,
                    content = Convert.ToBase64String(attachmentBytes)
                }
            }
        };

        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", resendApiKey);

        var response = await _httpClient.PostAsync("https://api.resend.com/emails", content);

        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync();
            _logger.LogError("Resend API error: {StatusCode} - {Error}", response.StatusCode, errorBody);
            throw new Exception($"Failed to send email: {response.StatusCode}");
        }

        _logger.LogInformation("Warranty email sent to {ToEmail}", toEmail);
    }
}

