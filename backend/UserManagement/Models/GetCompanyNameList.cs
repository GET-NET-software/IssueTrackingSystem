using Microsoft.EntityFrameworkCore;
using JwtAuthenticationManager.Models;

namespace UserManagement.Models
{
    public class GetCompanyNameList
    {
		private readonly UserContext _context;

		public GetCompanyNameList(UserContext context)
		{
			_context = context;
		}
		public virtual IEnumerable<Object> GetCompanyNames()
        {
                var companies = _context.Company.Select(c => new {c.companyId, c.companyName}).ToList();
                return companies;
        }
    }
}
