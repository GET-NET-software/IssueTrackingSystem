using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

namespace UserManagement.Models
{
    public class UserContext11: DbContext
    {

        public UserContext11(DbContextOptions<UserContext> options): base(options) 
        {	}
		public DbSet<User> Users { get; set; }
        public DbSet<Company> Company { get; set; }
    }
}
