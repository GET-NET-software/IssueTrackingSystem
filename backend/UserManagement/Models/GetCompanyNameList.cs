using Microsoft.EntityFrameworkCore;

namespace UserManagement.Models
{
    public class GetCompanyNameList
    {
        public virtual IEnumerable<Company> GetAllCards()
        {
            using (var context = new UserContext(new DbContextOptions<UserContext>()))
            {
                var dashboardContext = context.Company;
                return dashboardContext.ToList();
            }
        }
    }
}
