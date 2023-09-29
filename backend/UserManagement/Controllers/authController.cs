using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// using UserManagement.Models;
// using UserManagement.DTOs;
using Use;
using Microsoft.AspNetCore.Authorization;
using UserManagement.RabbitMQ;
using JwtAuthenticationManager.Models;
using RabbitMQ.Client;
using Newtonsoft.Json;

namespace UserManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly UserContext _dbContext;
		private readonly JwtTokenHandler _jwtTokenHandler;
		private readonly RabbitMQConnectionFactory _connectionFactory;  // rabbitmq connection factory
		//private readonly SendSessionClass _sendSession;

		public AuthController(UserContext dbContext, JwtTokenHandler jwtTokenHandler, RabbitMQConnectionFactory connectionFactory)
		{
			_dbContext = dbContext;
			_jwtTokenHandler = jwtTokenHandler;
			_connectionFactory = connectionFactory;
			//	_sendSession = sendSession;
		}

		[HttpPost]
		[Route("register")]
		public async Task<ActionResult<User>> Register(User request)
		{
			var (hash, salt) = PasswordHasher.HashPassword(request.Password);

			var user = new User
			{
				UserName = request.UserName,
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
				// log in after sign up
				//HttpContext.Session.SetString("UserName", user.FullName);
				// Send session info
				//_sendSession.SendSession(user.FullName);
				return Ok(user);
			}
			catch (DbUpdateException e)
			{
				return Ok(new { message = "Username or Email is not available." });
			}

		}

		// Login
		[HttpPost]
		[Route("login")]
		public async Task<ActionResult<AuthenticationResponse?>> Login(LoginDTO authenticationRequest)
		{
			var authenticationResponse = await _jwtTokenHandler.GenerateJwtToken(authenticationRequest);
			if (authenticationResponse == null)
				return Unauthorized(new { message = "Invalid Username or Password"});

			Response.Headers.Add("Authorization", $"Bearer {authenticationResponse}");

			Console.WriteLine(authenticationResponse);
			return authenticationResponse;
		}

		// Log out
		[HttpGet]
		[Route("logout")]
		public IActionResult Logout()
		{
			//HttpContext.Session.Remove("UserName");
			// Send session info
			//_sendSession.SendSession("No logged in user found");
			return Ok(new { message = "Logout successful" });
		}

		// check current user
		[HttpGet]
		[Route("checkUser")]
		[Authorize]
		// [Authorize(Roles = "Admin")]
		public IActionResult CheckUser()
		{
			return Ok(new {message = "ok"});
			// var userName = HttpContext.Session.GetString("UserName");

			// if (!string.IsNullOrEmpty(userName))
			// {
			// 	return Ok("Current user " + userName);
			// }
			// else
			// {
			// 	return Unauthorized("No Logged in user");
			// }
		}
	}

}
