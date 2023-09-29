using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagement.Models
{
    public class User
    {
        public int ID { get; set; }
        public string? UserName { get; set; }
        public string? Role { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        public string? Password { get; set; }

        [Display(Name = "Company")]
        public virtual int companyId { get; set; }

        [ForeignKey("companyId")]
        // public virtual Company Companies { get; set; }
        public string? PasswordSalt { get; set; }
    }
}
