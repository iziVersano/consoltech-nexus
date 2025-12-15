using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace Consoltech.AdminApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarrantyController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;
    private readonly IConfiguration _configuration;
    private readonly ILogger<WarrantyController> _logger;

    public WarrantyController(
        IWebHostEnvironment environment, 
        IConfiguration configuration,
        ILogger<WarrantyController> logger)
    {
        _environment = environment;
        _configuration = configuration;
        _logger = logger;
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
            // Save file to warranty-uploads folder
            var uploadsFolder = Path.Combine(_environment.ContentRootPath, "wwwroot", "warranty-uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileExtension = Path.GetExtension(invoice.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await invoice.CopyToAsync(stream);
            }

            // Send email notification
            await SendWarrantyEmail(fullName, email, phone, productModel, serialNumber, purchaseDate, filePath, invoice.FileName);

            _logger.LogInformation("Warranty registration submitted: {Email}, {SerialNumber}", email, serialNumber);

            return Ok(new { success = true, message = "Warranty registration submitted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process warranty registration");
            return StatusCode(500, new { success = false, message = "Failed to process warranty registration" });
        }
    }

    private async Task SendWarrantyEmail(
        string fullName, string email, string phone, 
        string productModel, string serialNumber, string purchaseDate,
        string attachmentPath, string originalFileName)
    {
        var smtpHost = _configuration["Email:SmtpHost"] ?? "smtp.gmail.com";
        var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
        var smtpUser = _configuration["Email:SmtpUser"];
        var smtpPass = _configuration["Email:SmtpPassword"];
        var toEmail = _configuration["Email:WarrantyRecipient"] ?? "support@consoltech.shop";

        if (string.IsNullOrEmpty(smtpUser) || string.IsNullOrEmpty(smtpPass))
        {
            _logger.LogWarning("SMTP not configured, skipping email send");
            return;
        }

        using var client = new SmtpClient(smtpHost, smtpPort)
        {
            Credentials = new NetworkCredential(smtpUser, smtpPass),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(smtpUser, "Consoltech Warranty"),
            Subject = "Warranty Registration – Nintendo Switch 2",
            IsBodyHtml = true,
            Body = $@"
                <h2>רישום אחריות חדש</h2>
                <table style='border-collapse: collapse;'>
                    <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>שם מלא:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{fullName}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>אימייל:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{email}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>טלפון:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{phone}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>דגם המוצר:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{productModel}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>מספר סידורי:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{serialNumber}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>תאריך רכישה:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{purchaseDate}</td></tr>
                </table>
                <p>החשבונית מצורפת למייל זה.</p>
            "
        };

        mailMessage.To.Add(toEmail);
        mailMessage.ReplyToList.Add(new MailAddress(email));
        mailMessage.Attachments.Add(new Attachment(attachmentPath) { Name = originalFileName });

        await client.SendMailAsync(mailMessage);
    }
}

