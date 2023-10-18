using JwtAuthenticationManager.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace UserManagement.Controllers
{
	public class UserRegisterController
	{
		public async Task<User> UserRegister(UserContext _dbContext, User request)
		{
			var (hash, salt) = PasswordHasher.HashPassword(request.Password);

			string role;
			if (request.Role == null)
				role = "Client";
			else
				role = request.Role;

			var user = new User
			{
				UserName = request.UserName,
				// Role = role,
				Role = "Client",
				Email = request.Email,
				companyId = request.companyId,
				Password = hash,
				PasswordSalt = salt
			};

			try
			{
				_dbContext.Users.Add(user);
				await _dbContext.SaveChangesAsync();
				return user;
			}
			catch (DbUpdateException e)
			{
				SqlException? innerException = e.InnerException as SqlException;
				if (innerException != null && (innerException.Number == 1062))
				{
					return null;
				}
				else
					throw;
				// return null;

			}
		}
	}

}
