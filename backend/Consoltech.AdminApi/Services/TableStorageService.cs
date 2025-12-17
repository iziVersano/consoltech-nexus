using Azure.Data.Tables;
using Consoltech.AdminApi.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Consoltech.AdminApi.Services
{
    public class TableStorageService
    {
        private readonly TableClient _tableClient;

        public TableStorageService(IConfiguration configuration)
        {
            var connectionString = configuration["AzureStorage:ConnectionString"];
            var tableName = configuration["AzureStorage:TableName"];

            _tableClient = new TableClient(connectionString, tableName);
            _tableClient.CreateIfNotExists();
        }

        public async Task SaveWarrantyAsync(WarrantySubmissionEntity entity)
        {
            await _tableClient.AddEntityAsync(entity);
        }

        public async Task<List<WarrantySubmissionEntity>> GetAllAsync()
        {
            var results = new List<WarrantySubmissionEntity>();

            await foreach (var entity in _tableClient.QueryAsync<WarrantySubmissionEntity>())
            {
                results.Add(entity);
            }

            return results
                .OrderByDescending(x => x.CreatedAt)
                .ToList();
        }
    }
}

