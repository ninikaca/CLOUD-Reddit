using System.ComponentModel.DataAnnotations;

namespace RedditDataRepository.DTO
{
    public class PostData
    {
        [Required]
        [MinLength(1)]
        public string Title { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [MinLength(1)]
        public string Content { get; set; }

        public string Image { get; set; }
    }
}
