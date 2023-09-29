using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using JwtAuthenticationManager.Models;

namespace Use
{
	public class JwtTokenHandler
	{
		public const string JWT_SECURITY_KEY = "qwertyuiopASDFGHJKLzxcvbnmqwertyuiopASDFGHJKLzxcvbnm";
		private const int JWT_TOKEN_VALIDITY_MIN = 60;
		private readonly UserContext _dbContext;

		// private readonly List<UserAccount> _userAccountList;

		public JwtTokenHandler(UserContext dbContext)
		{
			_dbContext = dbContext;

		}

		public async Task<ActionResult<AuthenticationResponse?>> GenerateJwtToken(LoginDTO authenticationRequest)
		{
			if (string.IsNullOrWhiteSpace(authenticationRequest.UserName) || string.IsNullOrWhiteSpace(authenticationRequest.Password))
				return null;

			// password validatio

			var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UserName == authenticationRequest.UserName);
			if (user == null)
				return null;

			if (!PasswordHasher.VerifyPassword(authenticationRequest.Password, user.Password, user.PasswordSalt))
			{
				return null;
			}

			// setting token expiration time
			var tokenExpiryTimeStamp = DateTime.Now.AddMinutes(JWT_TOKEN_VALIDITY_MIN);
			var tokenKey = Encoding.ASCII.GetBytes(JWT_SECURITY_KEY);

			var claimsIdentity = new ClaimsIdentity(new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Name, authenticationRequest.UserName),
				new Claim(ClaimTypes.Role, user.Role)
			});

			var signingCredentials = new SigningCredentials(
				new SymmetricSecurityKey(tokenKey),
				SecurityAlgorithms.HmacSha256Signature
			);

			var securityTokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = claimsIdentity,
				Expires = tokenExpiryTimeStamp,
				SigningCredentials = signingCredentials
			};

			var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
			var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
			var token = jwtSecurityTokenHandler.WriteToken(securityToken);
			var companyId = await _dbContext.Users
				.Where(u => u.UserName == user.UserName) // Assuming you want to filter by user name
				.Select(c => c.companyId)
				.FirstOrDefaultAsync();
			return new AuthenticationResponse
			{
				UserName = user.UserName,
				ExpiresIn = (int)tokenExpiryTimeStamp.Subtract(DateTime.Now).TotalSeconds,
				JwtToken = token,
				CompanyId = companyId
			};

		}
	}
}