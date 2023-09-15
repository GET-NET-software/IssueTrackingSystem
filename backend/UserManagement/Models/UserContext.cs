using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

namespace UserManagement.Models
{
    public class UserContext: DbContext
    {

        public UserContext(DbContextOptions<UserContext> options): base(options) 
        {

        }

        public DbSet<User> Users { get; set; }
    }
}
