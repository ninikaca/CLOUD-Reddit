using System.ComponentModel.DataAnnotations;

namespace RedditDataRepository.DTO
{
    public class CommentData
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string PostId { get; set; }

        [Required]
        [MinLength(1)]
        public string Content { get; set; }
    }
}
