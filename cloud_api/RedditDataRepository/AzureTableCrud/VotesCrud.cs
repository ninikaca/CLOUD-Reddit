using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedditDataRepository.AzureTableCrud
{
    public class VotesCrud
    {
        // Retrieves a vote based on its row key.
        public static async Task<Vote> ReadVote(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<Vote>("Vote", rowKey);
            return (await table.ExecuteAsync(retrieveOperation)).Result as Vote;
        }

        // Read all votes.
        public static async Task<List<Vote>> ReadVotes(CloudTable table)
        {
            if (table == null)
                return null;

            TableQuery<Vote> query = new TableQuery<Vote>();
            TableContinuationToken continuationToken = null;
            var votes = new List<Vote>();

            do
            {
                TableQuerySegment<Vote> queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                votes.AddRange(queryResult.Results);
                continuationToken = queryResult.ContinuationToken;
            } while (continuationToken != null);

            return votes;
        }

        // Retrieves a list of votes for a specific post or comment.
        public static async Task<List<Vote>> ReadVotesForPost(CloudTable table, string postId)
        {
            if (table == null || string.IsNullOrEmpty(postId))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Vote");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("PostId", QueryComparisons.Equal, postId));

            var query = new TableQuery<Vote>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.ToList();
        }

        // Retrieves a vote for a specific post and comment.
        public static async Task<Vote> ReadVoteForPostAndUser(CloudTable table, string postId, string userId)
        {
            if (table == null || string.IsNullOrEmpty(postId) || string.IsNullOrEmpty(userId))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Vote");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("PostId", QueryComparisons.Equal, postId));
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("UserId", QueryComparisons.Equal, userId));

            var query = new TableQuery<Vote>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.FirstOrDefault();
        }

        // Inserts a new vote.
        public static async Task<Vote> InsertVote(CloudTable table, Vote vote)
        {
            if (table == null || vote == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(vote);
            return (await table.ExecuteAsync(insertOperation)).Result as Vote;
        }

        // Updates an existing vote.
        public static async Task<Vote> UpdateVote(CloudTable table, string oldRowKey, Vote vote)
        {
            if (table == null || vote == null)
                return null;

            if (await DeleteVote(table, oldRowKey))
                return await InsertVote(table, vote);
            else
                return null;
        }

        // Deletes a vote.
        public static async Task<bool> DeleteVote(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return false;

            Vote vote = await ReadVote(table, rowKey);

            if (vote != null)
            {
                TableOperation deleteOperation = TableOperation.Delete(vote);
                return await table.ExecuteAsync(deleteOperation) != null;
            }
            else
                return false;
        }
    }
}
