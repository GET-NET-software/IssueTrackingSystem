// using Microsoft.EntityFrameworkCore;
// // using MySql.Data.MySqlClient;

// namespace JwtAuthenticationManager.Models
// {
//     public class UserContext: DbContext
//     {

//         public UserContext(DbContextOptions<UserContext> options): base(options) 
//         {

//         }
// 		// public UserContext() { }
// 		public DbSet<User> Users { get; set; }
//         public DbSet<Company> Company { get; set; }
//     }
// }


using JwtAuthenticationManager.Models;
using Microsoft.EntityFrameworkCore;

public partial class UserContext : DbContext
{
	// public UserContext()
	// 	: base("name=UserContext")
	// {
	// }
	public UserContext(DbContextOptions<UserContext> options)
	   : base(options)
	{
	}
	public virtual DbSet<User> Users { get; set; }
	public virtual DbSet<Company> Company { get; set; }
}