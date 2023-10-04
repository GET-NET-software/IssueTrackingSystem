using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LicenseManagementService.Models
{
    public class License
    {
        [Key]
        public string? product_license { get; set; }

        [Display (Name ="Product")]
        public virtual int? productId { get; set; }

        [ForeignKey("productId")]
        public virtual  Product products_by { get; set; }

        public int? companyId { get; set; }
        [Required]
        public string? issuedate { get; set; }

        public DateTime? expired_date { get; set; }
    }
}
