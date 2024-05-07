using AdminToolsConsoleApp.Models;
using Microsoft.WindowsAzure.Storage.Table;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminToolsConsoleApp.AzureTableCrud
{
    public class AdminsCrud
    {
        public static async Task<Admin> ReadAdmin(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<Admin>("Admin", rowKey);
            return (await table.ExecuteAsync(retrieveOperation)).Result as Admin;
        }

        public static async Task<Admin> ReadAdminById(CloudTable table, string id)
        {
            if (table == null || string.IsNullOrEmpty(id))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Admin");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("Id", QueryComparisons.Equal, id));

            var query = new TableQuery<Admin>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.Results.FirstOrDefault();
        }

        public static async Task<List<Admin>> ReadAdmins(CloudTable table)
        {
            if (table == null)
                return null;

            TableQuery<Admin> query = new TableQuery<Admin>();
            TableContinuationToken continuationToken = null;
            var admins = new List<Admin>();

            do
            {
                TableQuerySegment<Admin> queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                admins.AddRange(queryResult.Results);
                continuationToken = queryResult.ContinuationToken;
            } while (continuationToken != null);

            return admins;
        }

        public static async Task<Admin> InsertAdmin(CloudTable table, Admin admin)
        {
            if (table == null || admin == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(admin);
            return (await table.ExecuteAsync(insertOperation)).Result as Admin;
        }

        public static async Task<Admin> UpdateAdmin(CloudTable table, string oldRowKey, Admin admin)
        {
            if (table == null || admin == null)
                return null;

            if (await DeleteAdmin(table, oldRowKey))
                return await InsertAdmin(table, admin);
            else
                return null;
        }

        public static async Task<bool> DeleteAdmin(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return false;

            Admin admin = await ReadAdmin(table, rowKey);

            if (admin != null)
            {
                TableOperation deleteOperation = TableOperation.Delete(admin);
                return await table.ExecuteAsync(deleteOperation) != null;
            }
            else
                return false;
        }

    }
}
