namespace Consoltech.AdminApi.Models;

public class Product
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public required string ImageUrl { get; set; }
    public decimal Price { get; set; }
}

