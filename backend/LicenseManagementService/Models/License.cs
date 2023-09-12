using System.ComponentModel.DataAnnotations;

namespace LicenseManagementService.Models
{
    public class License
    {
        [Key]
        public string? product_license { get; set; }

        public string? product_name { get; set; }

        public string? product_status { get; set; }

        [Required]
        public string? user_id { get; set; }

        public DateTime? expired_date { get; set; }
    }
}
