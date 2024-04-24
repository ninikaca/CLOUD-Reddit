using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.DTO;
using RedditDataRepository.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedditDataRepository.AzureTableCrud
{
    public class PostsCrud
    {
        public static async Task<Post> ReadPost(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<Post>("Post", rowKey);
            return (await table.ExecuteAsync(retrieveOperation)).Result as Post;
        }

        public static async Task<RetrivedPostsData> ReadRelatedPostData(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return null;

            TableOperation retrieveOperation = TableOperation.Retrieve<Post>("Post", rowKey);
            Post post = (await table.ExecuteAsync(retrieveOperation)).Result as Post;

            // Get related post data like comments, votes, subs
            var votesPerPost = await VotesCrud.ReadVotesForPost(Account.Account.GetTable("votes"), rowKey);
            var commentsPerPost = await CommentsCrud.ReadCommentsForPost(Account.Account.GetTable("comments"), rowKey);
            var subsPerPost = await SubscriptionCrud.ReadSubscriptionsForPost(Account.Account.GetTable("subscriptions"), rowKey);
            var upvotes = votesPerPost.Where(v => v.IsUpvoted).ToList().Count();
            var downvotes = votesPerPost.Where(v => !v.IsUpvoted).ToList().Count();
            var votes_count = upvotes - downvotes;

            return new RetrivedPostsData()
            {
                PostId = post.RowKey,
                PostTitle = post.Title,
                PostContent = post.Content,
                PostAuthor = post.UserId,
                PostImageUrl = post.ImageUrl,
                VotesCount = votes_count,
                Comments = commentsPerPost,
                CommentsCount = commentsPerPost.Count(),
                UsersUpvoted = votesPerPost.Where(v => v.IsUpvoted == true).Select(v => v.UserId).ToList(),
                UsersDownvoted = votesPerPost.Where(v => v.IsUpvoted == false).Select(v => v.UserId).ToList(),
                UsersSubscribed = subsPerPost.Select(s => s.UserId).ToList()
            };
        }

        public static async Task<Post> ReadPostByUserId(CloudTable table, string id)
        {
            if (table == null || string.IsNullOrEmpty(id))
                return null;

            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Post");
            filter = TableQuery.CombineFilters(filter, TableOperators.And, TableQuery.GenerateFilterCondition("UserId", QueryComparisons.Equal, id));

            var query = new TableQuery<Post>().Where(filter);
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);

            return queryResult.FirstOrDefault();
        }


        public static async Task<List<Post>> ReadPosts(CloudTable table)
        {
            if (table == null)
                return null;

            TableQuery<Post> query = new TableQuery<Post>();
            TableContinuationToken continuationToken = null;
            var users = new List<Post>();

            do
            {
                TableQuerySegment<Post> queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                users.AddRange(queryResult.Results);
                continuationToken = queryResult.ContinuationToken;
            } while (continuationToken != null);

            return users;
        }


        public static async Task<Post> InsertPost(CloudTable table, Post post)
        {
            if (table == null || post == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(post);
            return (await table.ExecuteAsync(insertOperation)).Result as Post;
        }

        public static async Task<Post> UpdatePost(CloudTable table, string oldRowKey, Post post)
        {
            if (table == null || post == null)
                return null;

            if (await DeletePost(table, oldRowKey))
                return await InsertPost(table, post);
            else
                return null;
        }

        public static async Task<bool> DeletePost(CloudTable table, string rowKey)
        {
            if (table == null || string.IsNullOrEmpty(rowKey))
                return false;

            Post post = await ReadPost(table, rowKey);

            if (post != null)
            {
                // Delete all connected entities
                var votesPerPost = await VotesCrud.ReadVotesForPost(Account.Account.GetTable("votes"), rowKey);
                var commentsPerPost = await CommentsCrud.ReadCommentsForPost(Account.Account.GetTable("comments"), rowKey);
                var subsPerPost = await SubscriptionCrud.ReadSubscriptionsForPost(Account.Account.GetTable("subscriptions"), rowKey);

                foreach (var vote in votesPerPost)
                    await VotesCrud.DeleteVote(Account.Account.GetTable("votes"), vote.RowKey);

                foreach (var comment in commentsPerPost)
                    await CommentsCrud.DeleteComment(Account.Account.GetTable("comments"), comment.RowKey);

                foreach (var sub in subsPerPost)
                    await SubscriptionCrud.DeleteSubscription(Account.Account.GetTable("subscriptions"), sub.RowKey);

                TableOperation deleteOperation = TableOperation.Delete(post);
                return await table.ExecuteAsync(deleteOperation) != null;
            }
            else
                return false;
        }

        public static List<Post> ApplyFilters(List<Post> posts, PostQueryData query)
        {
            if (posts == null || posts.Count <= 0)
                return new List<Post>();
            else
            {
                // Filter posts by author aka user
                if (string.IsNullOrEmpty(query.UserId) == false)
                    posts = posts.Where(p => p.UserId == query.UserId).ToList();

                // Filter posts by search query
                if (string.IsNullOrEmpty(query.SearchQuery) == false)
                    posts = posts.Where(p => p.Title.Contains(query.SearchQuery)).ToList();

                if (posts.Count == 0)
                    return new List<Post>();
                else
                    return posts;
            }
        }

        public static List<Post> ApplySort(List<Post> posts, PostQueryData query)
        {
            if (posts == null || posts.Count <= 0)
                return new List<Post>();
            else
            {
                // Sort posts by title
                if (string.IsNullOrEmpty(query.Sort) == false)
                {
                    if (query.Sort == "asc")
                        posts = posts.OrderBy(post => post.Title).ToList();
                    else if (query.Sort == "desc")
                        posts = posts.OrderByDescending(post => post.Title).ToList();
                }

                if (posts.Count == 0)
                    return new List<Post>();
                else
                    return posts;
            }
        }

        public static async Task<List<RetrivedPostsData>> ApplyPaginationAndRelations(List<Post> posts, PostQueryData queryData)
        {
            // Paginate posts per page and page size
            int skip = (queryData.Page - 1) * queryData.PageSize;
            posts = posts.Skip(skip).Take(queryData.PageSize).ToList();

            // Get related comments, votes and subscriptions informations
            var votes = await VotesCrud.ReadVotes(Account.Account.GetTable("votes"));
            var comments = await CommentsCrud.ReadComments(Account.Account.GetTable("comments"));
            var subscriptions = await SubscriptionCrud.ReadSubscriptions(Account.Account.GetTable("subscriptions"));

            // Create DTO to project Retrived Posts Data
            var postsDatas = new List<RetrivedPostsData>();

            foreach (var post in posts)
            {
                var votesPerPost = votes.Where(v => v.PostId == post.RowKey).ToList();
                var commentsPerPost = comments.Where(c => c.PostId == post.RowKey).ToList();
                var upvotes = votesPerPost.Where(v => v.IsUpvoted).ToList().Count();
                var downvotes = votesPerPost.Where(v => !v.IsUpvoted).ToList().Count();
                var votes_count = upvotes - downvotes;
                var subsPerPost = subscriptions.Where(s => s.PostId == post.RowKey).ToList();

                postsDatas.Add(
                    new RetrivedPostsData()
                    {
                        PostId = post.RowKey,
                        PostTitle = post.Title,
                        PostContent = post.Content,
                        PostAuthor = post.UserId,
                        PostImageUrl = post.ImageUrl,
                        VotesCount = votes_count,
                        CommentsCount = commentsPerPost.Count(),
                        UsersUpvoted = votesPerPost.Where(v => v.IsUpvoted == true).Select(v => v.UserId).ToList(),
                        UsersDownvoted = votesPerPost.Where(v => v.IsUpvoted == false).Select(v => v.UserId).ToList(),
                        UsersSubscribed = subsPerPost.Select(s => s.UserId).ToList()
                    }
                );
            }

            return postsDatas;
        }
    }
}
