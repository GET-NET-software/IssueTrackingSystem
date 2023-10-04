using System.ComponentModel.DataAnnotations;

namespace LicenseManagementService.Models
{
    public class Product
    {
        [Key]
        public int? productId { get; set; }

        public string? productName { get; set; }

        public string? Desc { get; set; }
    }
}
