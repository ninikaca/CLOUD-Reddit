using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace RedditDataRepository.Models
{
    public class Subscription : TableEntity
    {
        public string PostId { get; set; }

        public string UserId { get; set; }

        public Subscription()
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = "Subscription";
        }

        public Subscription(string postId, string userId)
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = "Subscription";

            PostId = postId;
            UserId = userId;
        }
    }
}
