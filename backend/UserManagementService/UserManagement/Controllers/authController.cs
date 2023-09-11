using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagement.Models;
using UserManagement.DTOs;
using UserManagement.RabbitMQ;
using RabbitMQ.Client;

namespace UserManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly UserContext _dbContext;
		private readonly RabbitMQConnectionFactory _connectionFactory;  // rabbitmq connection factory
		private readonly SendSessionClass _sendSession;

		public AuthController(UserContext dbContext, RabbitMQConnectionFactory connectionFactory, SendSessionClass sendSession)
		{
			_dbContext = dbContext;
			_connectionFactory = connectionFactory;
			_sendSession = sendSession;
		}

		[HttpPost("register")]
		public async Task<ActionResult<User>> Register(User request)
		{
			var (hash, salt) = PasswordHasher.HashPassword(request.Password);

			var user = new User
			{
				FullName = request.FullName,
				status = request.status,
				Email = request.Email,
				CompanyName = request.CompanyName,
				Password = hash,
				PasswordSalt = salt
			};

			try
			{
				_dbContext.Users.Add(user);
				await _dbContext.SaveChangesAsync();
				// log in after sign up
				HttpContext.Session.SetString("UserName", user.FullName);
				// Send session info
				_sendSession.SendSession(user.FullName);
				return Ok(user);
			}
			catch (DbUpdateException e)
			{
				return Ok(new {message = "Username or Email is not available."} );
			}

		}

		// Login
		[HttpPost]
		[Route("Login")]
		public async Task<ActionResult<User>> Login(LoginDTO login)
		{
			var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.FullName == login.FullName);

			if (PasswordHasher.VerifyPassword(login.Password, user.Password, user.PasswordSalt))
			{
				HttpContext.Session.SetString("UserName", user.FullName);
				// Send session info
				_sendSession.SendSession(user.FullName);

				// Successful login
				return Ok("Hello " + user.FullName);
			}
			else
			{
				return BadRequest("Invalid username or password");
			}

		}

		// Log out
		[HttpPost("logout")]
		public IActionResult Logout()
		{
			HttpContext.Session.Remove("UserName");
			// Send session info
			_sendSession.SendSession("No logged in user found");
			return Ok(new { message = "Logout successful" });
		}

		// check current user
		[HttpGet("CheckUser")]
		public IActionResult CheckUser()
		{
			var userName = HttpContext.Session.GetString("UserName");

			if (!string.IsNullOrEmpty(userName))
			{
				return Ok("Current user " + userName);
			}
			else
			{
				return Unauthorized("No Logged in user");
			}
		}
	}

}