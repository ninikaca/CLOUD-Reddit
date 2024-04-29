using Microsoft.WindowsAzure.Storage.Table;
using NotificationService.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationService.AzureTableCrud
{
    public class AdministratorsCrud
    {
        public static async Task<Administrator> ReadAdministrator(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<Administrator>("Administrator", rowKey);
            return (await table.ExecuteAsync(retrieveOperation)).Result as Administrator;
        }

        public static async Task<Administrator> ReadAdministratorById(CloudTable table, string id)
        {
            if (table == null || string.IsNullOrEmpty(id))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Administrator");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("Id", QueryComparisons.Equal, id));

            var query = new TableQuery<Administrator>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.FirstOrDefault();
        }


        public static async Task<List<Administrator>> ReadAdministrators(CloudTable table)
        {
            if (table == null)
                return null;

            TableQuery<Administrator> query = new TableQuery<Administrator>();
            TableContinuationToken continuationToken = null;
            var administrators = new List<Administrator>();

            do
            {
                TableQuerySegment<Administrator> queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                administrators.AddRange(queryResult.Results);
                continuationToken = queryResult.ContinuationToken;
            } while (continuationToken != null);

            return administrators;
        }


        public static async Task<Administrator> InsertAdministrator(CloudTable table, Administrator administrator)
        {
            if (table == null || administrator == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(administrator);
            return (await table.ExecuteAsync(insertOperation)).Result as Administrator;
        }

        public static async Task<Administrator> UpdateAdministrator(CloudTable table, string oldRowKey, Administrator administrator)
        {
            if (table == null || administrator == null)
                return null;

            if (await DeleteAdministrator(table, oldRowKey))
                return await InsertAdministrator(table, administrator);
            else
                return null;
        }

        public static async Task<bool> DeleteAdministrator(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return false;

            Administrator administrator = await ReadAdministrator(table, rowKey);

            if (administrator != null)
            {
                TableOperation deleteOperation = TableOperation.Delete(administrator);
                return await table.ExecuteAsync(deleteOperation) != null;
            }
            else
                return false;
        }
    }
}
