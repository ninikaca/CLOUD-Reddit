using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedditDataRepository.AzureTableCrud
{
    public class SubscriptionCrud
    {
        // Retrieves a subscription based on its row key.
        public static async Task<Subscription> ReadSubscription(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<Subscription>("Subscription", rowKey);
            return (await table.ExecuteAsync(retrieveOperation)).Result as Subscription;
        }

        // Retrieves a list of subscriptions for a specific user.
        public static async Task<List<Subscription>> ReadSubscriptionsForUser(CloudTable table, string userId)
        {
            if (table == null || string.IsNullOrEmpty(userId))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Subscription");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("UserId", QueryComparisons.Equal, userId));

            var query = new TableQuery<Subscription>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.ToList();
        }

        // Retrieves a list of subscriptions for a specific post.
        public static async Task<List<Subscription>> ReadSubscriptionsForPost(CloudTable table, string postId)
        {
            if (table == null || string.IsNullOrEmpty(postId))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Subscription");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("PostId", QueryComparisons.Equal, postId));

            var query = new TableQuery<Subscription>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.ToList();
        }

        // Retrieves all subscriptions.
        public static async Task<List<Subscription>> ReadSubscriptions(CloudTable table)
        {
            if (table == null)
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Subscription");

            var query = new TableQuery<Subscription>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.ToList();
        }

        // Inserts a new subscription.
        public static async Task<Subscription> InsertSubscription(CloudTable table, Subscription subscription)
        {
            if (table == null || subscription == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(subscription);
            return (await table.ExecuteAsync(insertOperation)).Result as Subscription;
        }

        // Updates an existing subscription.
        public static async Task<Subscription> UpdateSubscription(CloudTable table, string oldRowKey, Subscription subscription)
        {
            if (table == null || subscription == null)
                return null;

            if (await DeleteSubscription(table, oldRowKey))
                return await InsertSubscription(table, subscription);
            else
                return null;
        }

        // Deletes a subscription.
        public static async Task<bool> DeleteSubscription(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return false;

            Subscription subscription = await ReadSubscription(table, rowKey);

            if (subscription != null)
            {
                TableOperation deleteOperation = TableOperation.Delete(subscription);
                return await table.ExecuteAsync(deleteOperation) != null;
            }
            else
                return false;
        }
    }
}
