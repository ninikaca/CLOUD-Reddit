using RedditDataRepository.Models;
using System.Collections.Generic;

namespace RedditDataRepository.DTO
{
    public class RetrivedPostsData
    {
        public string PostId { get; set; }

        public string PostTitle { get; set; }

        public string PostContent { get; set; }

        public string PostAuthor { get; set; }

        public string PostImageUrl { get; set; } = "";

        public int VotesCount { get; set; } = 0;

        public int CommentsCount { get; set; } = 0;

        public List<Comment> Comments { get; set; } = new List<Comment>();

        public List<string> UsersUpvoted { get; set; } = new List<string>();

        public List<string> UsersDownvoted { get; set; } = new List<string>();

        public List<string> UsersSubscribed { get; set; } = new List<string>();
    }
}
