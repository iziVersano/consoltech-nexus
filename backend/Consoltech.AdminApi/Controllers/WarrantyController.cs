using Consoltech.AdminApi.Models;
using Consoltech.AdminApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Consoltech.AdminApi.Controllers
{
    [ApiController]
    [Route("api/warranty")]
    public class WarrantyController : ControllerBase
    {
        private readonly LocalStorageService _localStorageService;

        public WarrantyController(LocalStorageService localStorageService)
        {
            _localStorageService = localStorageService;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> SubmitWarranty(
            [FromForm] string customerName,
            [FromForm] string email,
            [FromForm] string product,
            [FromForm] string serialNumber,
            [FromForm] IFormFile invoice)
        {
            try
            {
                string invoiceUrl = null;
                string invoiceFileName = null;

                if (invoice != null)
                {
                    invoiceFileName = invoice.FileName;
                    using var stream = invoice.OpenReadStream();
                    invoiceUrl = await _localStorageService.SaveInvoiceAsync(stream, invoice.FileName);
                }

                var entity = new WarrantySubmissionEntity
                {
                    CustomerName = customerName,
                    Email = email,
                    Product = product,
                    SerialNumber = serialNumber,
                    InvoiceUrl = invoiceUrl,
                    InvoiceFileName = invoiceFileName
                };

                await _localStorageService.SaveWarrantyRecordAsync(entity);

                return Ok(new { success = true, message = "Warranty registration submitted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = $"Error submitting warranty: {ex.Message}" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var records = await _localStorageService.GetAllRecordsAsync();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = $"Error retrieving records: {ex.Message}" });
            }
        }

        [HttpDelete("{identifier}")]
        public async Task<IActionResult> DeleteWarranty(string identifier)
        {
            try
            {
                var deleted = await _localStorageService.DeleteWarrantyRecordAsync(identifier);

                if (!deleted)
                {
                    return NotFound(new { success = false, message = "Warranty record not found" });
                }

                return Ok(new { success = true, message = "Warranty record deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = $"Error deleting warranty: {ex.Message}" });
            }
        }
    }
}
