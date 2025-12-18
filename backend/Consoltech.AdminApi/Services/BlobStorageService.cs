using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Consoltech.AdminApi.Services
{
    public class BlobStorageService
    {
        private readonly BlobContainerClient _containerClient;

        public BlobStorageService(IConfiguration configuration)
        {
            var connectionString = configuration["AzureStorage:ConnectionString"];
            var containerName = configuration["AzureStorage:BlobContainer"];

            var blobServiceClient = new BlobServiceClient(connectionString);
            _containerClient = blobServiceClient.GetBlobContainerClient(containerName);
        }

        public async Task<string> UploadInvoiceAsync(Stream fileStream, string fileName)
        {
            var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
            var blobClient = _containerClient.GetBlobClient(uniqueFileName);

            await blobClient.UploadAsync(fileStream, overwrite: true);

            // Generate SAS URL with 24-hour expiry (read-only access)
            var sasBuilder = new BlobSasBuilder
            {
                BlobContainerName = _containerClient.Name,
                BlobName = uniqueFileName,
                Resource = "b", // "b" = blob
                ExpiresOn = DateTimeOffset.UtcNow.AddHours(24)
            };
            sasBuilder.SetPermissions(BlobSasPermissions.Read);

            var sasUri = blobClient.GenerateSasUri(sasBuilder);
            return sasUri.ToString();
        }
    }
}

