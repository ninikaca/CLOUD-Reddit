using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace RedditDataRepository.Models
{
    public class Comment : TableEntity
    {
        public string PostId { get; set; }

        public string UserId { get; set; }

        public string Content { get; set; }

        public Comment()
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = "Comment";
        }

        public Comment(string postId, string userId, string content)
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = "Comment";

            PostId = postId;
            UserId = userId;
            Content = content;
        }
    }
}