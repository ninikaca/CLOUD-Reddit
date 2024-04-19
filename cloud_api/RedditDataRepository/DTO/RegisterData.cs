using System.ComponentModel.DataAnnotations;

namespace RedditDataRepository.DTO
{
    public class RegisterData
    {
        [Required(ErrorMessage = "Name is required.")]
        [MinLength(1, ErrorMessage = "Name must have at least 1 character.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Surname is required.")]
        [MinLength(1, ErrorMessage = "Surname must have at least 1 character.")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [MinLength(1, ErrorMessage = "Address must have at least 1 character.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "City is required.")]
        [MinLength(1, ErrorMessage = "City must have at least 1 character.")]
        public string City { get; set; }

        [Required(ErrorMessage = "Country is required.")]
        [MinLength(1, ErrorMessage = "Country must have at least 1 character.")]
        public string Country { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [MinLength(1, ErrorMessage = "Phone number must have at least 1 character.")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [MinLength(1, ErrorMessage = "Email must have at least 1 character.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(1, ErrorMessage = "Password must have at least 1 character.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Image URL is required.")]
        [MinLength(1, ErrorMessage = "Image URL must have at least 1 character.")]
        public string Image { get; set; }
    }
}
