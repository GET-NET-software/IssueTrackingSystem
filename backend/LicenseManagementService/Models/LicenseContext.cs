using Microsoft.EntityFrameworkCore;

namespace LicenseManagementService.Models
{
    public class LicenseContext : DbContext
    {

        public LicenseContext(DbContextOptions<LicenseContext> options) : base(options)
        {
        }

        public DbSet<License> products { get; set; }
    }
}
