using Microsoft.EntityFrameworkCore;
using JwtAuthenticationManager.Models;

namespace UserManagement.Controllers
{
	public class GetList
	{
		private readonly UserContext _context;

		public GetList(UserContext context)
		{
			_context = context;
		}
		public virtual IEnumerable<Object> GetCompanyNames()
		{
			var companies = _context.Company.Select(c => new { c.companyId, c.companyName }).ToList();
			return companies;
		}

		// public virtual IEnumerable<object> GetRoleNames()
		// {
		// 	var roles = _context.Role.Select(r => new { r.roleId, r.roleName }).ToList();
		// 	return roles;
		// }
	}
}
