using Microsoft.EntityFrameworkCore;
using Consoltech.AdminApi.Models;

namespace Consoltech.AdminApi.Data;

public class ProductsDbContext : DbContext
{
    public ProductsDbContext(DbContextOptions<ProductsDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Title = "PlayStation 5",
                Description = "Next-generation gaming console with ultra-fast SSD and ray tracing technology. Experience lightning-fast loading and stunning graphics.",
                Category = "Gaming",
                ImageUrl = "/images/bd80e124-a5e2-4d34-9c82-ebc0dbd6a697.png",
                Price = 499.99m
            },
            new Product
            {
                Id = 2,
                Title = "Xbox Series X",
                Description = "The most powerful Xbox ever with 12 teraflops of GPU performance and Smart Delivery technology.",
                Category = "Gaming",
                ImageUrl = "/images/78a95f48-606e-44b6-950e-af0555a3f04f.png",
                Price = 449.99m
            },
            new Product
            {
                Id = 3,
                Title = "Professional Drones",
                Description = "High-performance drones for commercial photography, surveying, and recreational flying with advanced stabilization.",
                Category = "Drones",
                ImageUrl = "/images/07ba8bc0-8d14-4d62-a534-659913ac5f99.png",
                Price = 1299.99m
            },
            new Product
            {
                Id = 4,
                Title = "Smart E-Bikes",
                Description = "Electric bikes with smart connectivity, long-range batteries, and advanced motor systems for urban mobility.",
                Category = "E-Bikes",
                ImageUrl = "/images/a0bd3ab6-05d5-4312-b6ec-f0e256d7a63a.png",
                Price = 1899.99m
            },
            new Product
            {
                Id = 5,
                Title = "4K Smart TVs",
                Description = "Ultra-high definition smart TVs with AI upscaling, HDR support, and built-in streaming platforms.",
                Category = "TVs",
                ImageUrl = "/images/6df37998-af04-426e-b749-365ffeb66787.png",
                Price = 799.99m
            },
            new Product
            {
                Id = 6,
                Title = "Gaming Accessories",
                Description = "Premium gaming peripherals including controllers, headsets, and racing wheels from top brands.",
                Category = "Gaming",
                ImageUrl = "/images/bd80e124-a5e2-4d34-9c82-ebc0dbd6a697.png",
                Price = 149.99m
            },
            new Product
            {
                Id = 7,
                Title = "Smart Home Electronics",
                Description = "Connected home devices including smart speakers, security cameras, and automation systems.",
                Category = "Electronics",
                ImageUrl = "/images/6df37998-af04-426e-b749-365ffeb66787.png",
                Price = 299.99m
            }
        );
    }
}

