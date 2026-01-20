using System;

namespace Consoltech.AdminApi.Models
{
    public class WarrantySubmissionEntity
    {
        // Identifiers (kept for compatibility with existing JSON data)
        public string PartitionKey { get; set; } = "Warranty";
        public string RowKey { get; set; } = Guid.NewGuid().ToString();
        public DateTimeOffset? Timestamp { get; set; }
        public string? ETag { get; set; }

        // Warranty form fields
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Product { get; set; }
        public string SerialNumber { get; set; }

        // Invoice attachment
        public string InvoiceUrl { get; set; }
        public string InvoiceFileName { get; set; }

        // Metadata
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
