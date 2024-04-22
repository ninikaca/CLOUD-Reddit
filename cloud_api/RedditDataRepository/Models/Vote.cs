using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace RedditDataRepository.Models
{
    public class Vote : TableEntity
    {
        public string UserId { get; set; }

        public string PostId { get; set; }

        public bool IsUpvoted { get; set; }

        public Vote()
        {
            PartitionKey = "Vote";
            RowKey = Guid.NewGuid().ToString();
        }

        public Vote(string userId, string postId, bool isUpvoted)
        {
            PartitionKey = "Vote";
            RowKey = Guid.NewGuid().ToString();

            UserId = userId;
            PostId = postId;
            IsUpvoted = isUpvoted;
        }
    }
}
