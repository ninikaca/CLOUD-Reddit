using System.ComponentModel.DataAnnotations;

namespace RedditDataRepository.DTO
{
    public class VoteData
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string PostId { get; set; }

        [Required]
        public bool IsUpvoted { get; set; }
    }
}
