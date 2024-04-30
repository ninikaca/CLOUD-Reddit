using HealthMonitoringService.Models;
using Microsoft.WindowsAzure.Storage.Table;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMonitoringService.AzureTableCrud
{
    public class HealthStatusesCrud
    {
        public static async Task<List<HealthStatus>> ReadStatuses(CloudTable table)
        {
            if (table == null)
                return null;

            TableQuery<HealthStatus> query = new TableQuery<HealthStatus>();
            TableContinuationToken continuationToken = null;
            var statuses = new List<HealthStatus>();

            do
            {
                TableQuerySegment<HealthStatus> queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                statuses.AddRange(queryResult.Results);
                continuationToken = queryResult.ContinuationToken;
            } while (continuationToken != null);

            return statuses.Take(500).ToList();
        }

        public static async Task<HealthStatus> InsertStatus(CloudTable table, HealthStatus status)
        {
            if (table == null || status == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(status);
            return (await table.ExecuteAsync(insertOperation)).Result as HealthStatus;
        }
    }
}
