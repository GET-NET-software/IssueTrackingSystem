using System.ComponentModel.DataAnnotations;

namespace UserManagement.Models
{
    public class User
    {
        public int ID { get; set; }

        public string? FullName { get; set; }

        public string? status { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? CompanyName { get; set; }
        public string? PasswordSalt { get; set; }
    }
}
