using Consoltech.AdminApi.Models;
using Consoltech.AdminApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Consoltech.AdminApi.Controllers
{
    [ApiController]
    [Route("api/warranty")]
    public class WarrantyController : ControllerBase
    {
        private readonly BlobStorageService _blobStorageService;
        private readonly TableStorageService _tableStorageService;

        public WarrantyController(
            BlobStorageService blobStorageService,
            TableStorageService tableStorageService)
        {
            _blobStorageService = blobStorageService;
            _tableStorageService = tableStorageService;
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
            string invoiceUrl = null;
            string invoiceFileName = null;

            if (invoice != null)
            {
                using var stream = invoice.OpenReadStream();
                invoiceUrl = await _blobStorageService.UploadInvoiceAsync(stream, invoice.FileName);
                invoiceFileName = invoice.FileName;
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

            await _tableStorageService.SaveWarrantyAsync(entity);

            return Ok(new { success = true });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var records = await _tableStorageService.GetAllAsync();
            return Ok(records);
        }
    }
}

