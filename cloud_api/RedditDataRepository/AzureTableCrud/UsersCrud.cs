using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedditDataRepository.AzureTableCrud
{
    public class UsersCrud
    {
        public static async Task<User> ReadUser(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<User>("User", rowKey);
            return (await table.ExecuteAsync(retrieveOperation)).Result as User;
        }

        public static async Task<User> ReadUserById(CloudTable table, string id)
        {
            if (table == null || string.IsNullOrEmpty(id))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "User");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("Id", QueryComparisons.Equal, id));

            var query = new TableQuery<User>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.FirstOrDefault();
        }


        public static async Task<List<User>> ReadUsers(CloudTable table)
        {
            if (table == null)
                return null;

            TableQuery<User> query = new TableQuery<User>();
            TableContinuationToken continuationToken = null;
            var users = new List<User>();

            do
            {
                TableQuerySegment<User> queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                users.AddRange(queryResult.Results);
                continuationToken = queryResult.ContinuationToken;
            } while (continuationToken != null);

            return users;
        }


        public static async Task<User> InsertUser(CloudTable table, User user)
        {
            if (table == null || user == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(user);
            return (await table.ExecuteAsync(insertOperation)).Result as User;
        }

        public static async Task<User> UpdateUser(CloudTable table, string oldRowKey, User user)
        {
            if (table == null || user == null)
                return null;

            if (await DeleteUser(table, oldRowKey))
                return await InsertUser(table, user);
            else
                return null;
        }

        public static async Task<bool> DeleteUser(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return false;

            User user = await ReadUser(table, rowKey);

            if (user != null)
            {
                TableOperation deleteOperation = TableOperation.Delete(user);
                return await table.ExecuteAsync(deleteOperation) != null;
            }
            else
                return false;
        }
    }
}
