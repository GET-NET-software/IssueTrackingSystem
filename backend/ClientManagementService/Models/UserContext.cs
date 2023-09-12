using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ClientManagementService.Models
{
    public class UserContext: DbContext
    {

        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
