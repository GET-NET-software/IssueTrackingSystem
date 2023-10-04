using Microsoft.EntityFrameworkCore;

namespace LicenseManagementService.Models
{
    public class LicenseContext : DbContext
    {

        public LicenseContext(DbContextOptions<LicenseContext> options) : base(options)
        {
        }

        public DbSet<License> products { get; set; }
        public DbSet<Product> products_by { get; set; }
    }
}
