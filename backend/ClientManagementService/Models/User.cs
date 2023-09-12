using System.ComponentModel.DataAnnotations;

namespace ClientManagementService.Models
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
    }
}
