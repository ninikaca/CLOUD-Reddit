using System.ComponentModel.DataAnnotations;

namespace RedditDataRepository.DTO
{
    public class LoginData
    {
        [Required]
        [MinLength(1)]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
