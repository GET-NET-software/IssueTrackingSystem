using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace issuemodule.Models
{
    public class DashboardContext : DbContext
    {
        public DbSet<Card> Cards { get; set; }
        public DbSet<State> States { get; set; }
        public DashboardContext(DbContextOptions options) : base(options)
{
    //Database.EnsureCreated();
    // if (States is null || States.ToList().Any()) // Add null check for States
    //     return;
    
    // States.Add(new State { Name = "ToDo" });
    // States.Add(new State { Name = "InProgress" });
    // States.Add(new State { Name = "Done" });

    // SaveChanges();
}
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(@"server=localhost ; user=root; database=issuedb; password=");
        }
        
    }
}
