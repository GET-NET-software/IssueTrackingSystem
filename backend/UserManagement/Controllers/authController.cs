using Microsoft.AspNetCore.Mvc;
using Use;
using Microsoft.AspNetCore.Authorization;
using UserManagement.RabbitMQ;
using JwtAuthenticationManager.Models;

namespace UserManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly UserContext _dbContext;
		private readonly JwtTokenHandler _jwtTokenHandler;
		private readonly RabbitMQConnectionFactory _connectionFactory;
		public AuthController(UserContext dbContext, JwtTokenHandler jwtTokenHandler, RabbitMQConnectionFactory connectionFactory)
		{
			_dbContext = dbContext;
			_jwtTokenHandler = jwtTokenHandler;
			_connectionFactory = connectionFactory;
		}

		[HttpPost]
		[Route("register")]
		public async Task<ActionResult<User>> Register(UserContext _dbContext, User request)
		{
			UserRegisterController userRegisterController = new UserRegisterController();

			var user = new User();
			user = await userRegisterController.UserRegister(_dbContext, request);

			if (user != null)
				return Ok(user);

			return Ok(new { message = "Username or Email is not available." });
		}

		// Login
		[HttpPost]
		[Route("login")]
		public async Task<ActionResult<AuthenticationResponse?>> Login(LoginDTO authenticationRequest)
		{
			var authenticationResponse = await _jwtTokenHandler.GenerateJwtToken(authenticationRequest);
			if (authenticationResponse == null)
				return Unauthorized(new { message = "Invalid Username or Password" });

			Response.Headers.Add("Authorization", $"Bearer {authenticationResponse}");

			var companyName = _jwtTokenHandler.GetCompanyName();

			SendCompanyNameClass sendCompanyNameClass = new SendCompanyNameClass();
			// sendCompanyNameClass.SendCompanyName(_connectionFactory, companyName, authenticationRequest.UserName);

			return authenticationResponse;
		}

		// Log out
		[HttpGet]
		[Route("logout")]
		public IActionResult Logout()
		{
			return Ok(new { message = "Logout successful" });
		}

		// check current user
		[HttpGet]
		[Route("checkUser")]
		[Authorize]
		// [Authorize(Roles = "Admin")]
		public IActionResult CheckUser()
		{
			return Ok(new { message = "ok" });
		}
	}

}
