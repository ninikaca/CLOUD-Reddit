using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedditDataRepository.AzureTableCrud
{
    public class CommentsCrud
    {
        // Retrieves a comment based on its row key.
        public static async Task<Comment> ReadComment(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<Comment>("Comment", rowKey);
            return (await table.ExecuteAsync(retrieveOperation)).Result as Comment;
        }

        // Retrieves a list of comments for a specific post.
        public static async Task<List<Comment>> ReadCommentsForPost(CloudTable table, string postId)
        {
            if (table == null || string.IsNullOrEmpty(postId))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Comment");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("PostId", QueryComparisons.Equal, postId));

            var query = new TableQuery<Comment>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.ToList();
        }

        // Read all comments.
        public static async Task<List<Comment>> ReadComments(CloudTable table)
        {
            if (table == null)
                return null;

            TableQuery<Comment> query = new TableQuery<Comment>();
            TableContinuationToken continuationToken = null;
            var comments = new List<Comment>();

            do
            {
                TableQuerySegment<Comment> queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                comments.AddRange(queryResult.Results);
                continuationToken = queryResult.ContinuationToken;
            } while (continuationToken != null);

            return comments;
        }

        // Inserts a new comment.
        public static async Task<Comment> InsertComment(CloudTable table, Comment comment)
        {
            if (table == null || comment == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(comment);
            return (await table.ExecuteAsync(insertOperation)).Result as Comment;
        }

        // Updates an existing comment.
        public static async Task<Comment> UpdateComment(CloudTable table, string oldRowKey, Comment comment)
        {
            if (table == null || comment == null)
                return null;

            if (await DeleteComment(table, oldRowKey))
                return await InsertComment(table, comment);
            else
                return null;
        }

        // Deletes a comment.
        public static async Task<bool> DeleteComment(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return false;

            Comment comment = await ReadComment(table, rowKey);

            if (comment != null)
            {
                TableOperation deleteOperation = TableOperation.Delete(comment);
                return await table.ExecuteAsync(deleteOperation) != null;
            }
            else
                return false;
        }
    }
}
