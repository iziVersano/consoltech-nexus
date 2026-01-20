using Consoltech.AdminApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Consoltech.AdminApi.Services
{
    public class LocalStorageService
    {
        private readonly string _uploadsDirectory;
        private readonly string _dataFilePath;

        public LocalStorageService()
        {
            _uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "AppData", "warranty-uploads");
            _dataFilePath = Path.Combine(Directory.GetCurrentDirectory(), "AppData", "warranty-records.json");

            // Ensure directories exist
            Directory.CreateDirectory(_uploadsDirectory);
            Directory.CreateDirectory(Path.GetDirectoryName(_dataFilePath));

            // Ensure data file exists
            if (!File.Exists(_dataFilePath))
            {
                File.WriteAllText(_dataFilePath, "[]");
            }
        }

        public async Task<string> SaveInvoiceAsync(Stream fileStream, string fileName)
        {
            var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
            var filePath = Path.Combine(_uploadsDirectory, uniqueFileName);

            using (var fileStreamOut = File.Create(filePath))
            {
                await fileStream.CopyToAsync(fileStreamOut);
            }

            // Return relative path
            return $"/warranty-uploads/{uniqueFileName}";
        }

        public async Task SaveWarrantyRecordAsync(WarrantySubmissionEntity entity)
        {
            var records = await GetAllRecordsAsync();
            records.Add(entity);

            var json = JsonSerializer.Serialize(records, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            await File.WriteAllTextAsync(_dataFilePath, json);
        }

        public async Task<List<WarrantySubmissionEntity>> GetAllRecordsAsync()
        {
            var json = await File.ReadAllTextAsync(_dataFilePath);
            var records = JsonSerializer.Deserialize<List<WarrantySubmissionEntity>>(json) ?? new List<WarrantySubmissionEntity>();
            return records.OrderByDescending(x => x.CreatedAt).ToList();
        }
    }
}
