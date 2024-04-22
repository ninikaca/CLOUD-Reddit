using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.DTO;
using System;

namespace RedditDataRepository.Models
{
    public class Post : TableEntity
    {
        public string Title { get; set; }

        public string UserId { get; set; }

        public string Content { get; set; }

        public string ImageUrl { get; set; }

        public Post()
        {
            long timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();

            PartitionKey = "Post";
            RowKey = timestamp.ToString();
        }

        public Post(string title, string userId, string content, string imageBlobUrl)
        {
            long timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();

            PartitionKey = "Post";
            RowKey = timestamp.ToString();

            Title = title;
            UserId = userId;
            Content = content;
            ImageUrl = imageBlobUrl;
        }

        public Post(PostData data)
        {
            long timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();

            PartitionKey = "Post";
            RowKey = timestamp.ToString();

            Title = data.Title;
            UserId = data.UserId;
            Content = data.Content;
            ImageUrl = data.Image;
        }
    }
}
