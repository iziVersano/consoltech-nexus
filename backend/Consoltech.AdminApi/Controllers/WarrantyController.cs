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
        private readonly BlobStorageService? _blobStorageService;
        private readonly TableStorageService? _tableStorageService;
        private readonly LocalStorageService _localStorageService;
        private readonly bool _useAzureStorage;

        public WarrantyController(
            LocalStorageService localStorageService,
            BlobStorageService? blobStorageService = null,
            TableStorageService? tableStorageService = null)
        {
            _localStorageService = localStorageService;
            _blobStorageService = blobStorageService;
            _tableStorageService = tableStorageService;

            // Use Azure Storage only if both services are available
            _useAzureStorage = blobStorageService != null && tableStorageService != null;
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

                    if (_useAzureStorage && _blobStorageService != null)
                    {
                        using var stream = invoice.OpenReadStream();
                        invoiceUrl = await _blobStorageService.UploadInvoiceAsync(stream, invoice.FileName);
                    }
                    else
                    {
                        using var stream = invoice.OpenReadStream();
                        invoiceUrl = await _localStorageService.SaveInvoiceAsync(stream, invoice.FileName);
                    }
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

                if (_useAzureStorage && _tableStorageService != null)
                {
                    await _tableStorageService.SaveWarrantyAsync(entity);
                }
                else
                {
                    await _localStorageService.SaveWarrantyRecordAsync(entity);
                }

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
                if (_useAzureStorage && _tableStorageService != null)
                {
                    var records = await _tableStorageService.GetAllAsync();
                    return Ok(records);
                }
                else
                {
                    var records = await _localStorageService.GetAllRecordsAsync();
                    return Ok(records);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = $"Error retrieving records: {ex.Message}" });
            }
        }
    }
}

