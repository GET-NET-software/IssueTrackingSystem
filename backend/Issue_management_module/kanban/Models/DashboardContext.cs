using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Kanban.Models
{
    public class DashboardContext : DbContext
    {
       
        public DashboardContext(DbContextOptions options) : base(options)
        {
            //Database.EnsureCreated();
            //if (States.ToList().Any())
            //    return;

            //States.Add(new State { Name = "ToDo" });
            //States.Add(new State { Name = "InProgress" });
            //States.Add(new State { Name = "Done" });

            //SaveChanges();
        }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Status> Status { get; set; }
        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(@"server=localhost ; user=root; database=issuedb; password=");
        }
        */
    }
}
