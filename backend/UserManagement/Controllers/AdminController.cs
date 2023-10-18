// using JwtAuthenticationManager.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Data.SqlClient;
// using Microsoft.EntityFrameworkCore;

// namespace UserManagement.Controllers
// {
// 	[Route("api/[controller]")]
// 	[ApiController]
// 	public class AdminController : ControllerBase
// 	{
// 		private readonly UserContext _dbContext;
// 		public AdminController(UserContext dbContext)
// 		{
// 			_dbContext = dbContext;
// 		}

// 		// admin can register client, developer and other admin
// 		[HttpPost]
// 		[Route("register")]
// 		public async Task<ActionResult<User>> Register(UserContext _dbContext, User request)
// 		{
// 			UserRegisterController userRegisterController = new UserRegisterController();

// 			var user = new User();
// 			user = await userRegisterController.UserRegister(_dbContext, request);

// 			if (user != null)
// 				return Ok(user);

// 			return Ok(new { message = "Username or Email is not available." });
// 		}

// 		[HttpGet]
// 		[Route("getRoles")]
// 		public IActionResult GetRole()
// 		{
// 			GetList getList = new GetList(_dbContext);
// 			var roles = getList.GetRoleNames();
// 			return Ok(roles);
// 		}

// 		[HttpPost]
// 		[Route("registerCompany")]
// 		public async Task<ActionResult<Company>> RegisterCompany(UserContext _dbContext, Company request)
// 		{
// 			var company = new Company
// 			{
// 				companyName = request.companyName,
// 				companyAddress = request.companyAddress,
// 				companyContactNumber = request.companyContactNumber
// 			};

// 			try
// 			{
// 				_dbContext.Company.Add(company);
// 				await _dbContext.SaveChangesAsync();
// 				return company;
// 			}
// 			catch (DbUpdateException e)
// 			{
// 				SqlException? innerException = e.InnerException as SqlException;
// 				if (innerException != null && (innerException.Number == 1062))
// 				{
// 					return null;
// 				}
// 				else
// 					throw;
// 				// return null;

// 			}
// 		}
// 	}
// }

using JwtAuthenticationManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using UserManagement.RabbitMQ;

namespace UserManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly UserContext _dbContext;
		private readonly RabbitMQConnectionFactory _connectionFactory;
		public AdminController(UserContext dbContext, RabbitMQConnectionFactory connectionFactory)
		{
			_dbContext = dbContext;
			_connectionFactory = connectionFactory;
		}

		// admin can register client, developer and other admin
		// [HttpPost]
		// [Route("register")]
		// public async Task<ActionResult<User>> Register(UserContext _dbContext, User request)
		// {
		//   UserRegisterController userRegisterController = new UserRegisterController();

		//   var user = new User();
		//   user = await userRegisterController.UserRegister(_dbContext, request);

		//   if (user != null)
		//     return Ok(user);

		//   return Ok(new { message = "Username or Email is not available." });
		// }

		// [HttpGet]
		// [Route("getRoles")]
		// public IActionResult GetRole()
		// {
		//   GetList getList = new GetList(_dbContext);
		//   var roles = getList.GetRoleNames();
		//   return Ok(roles);
		// }

		// [HttpPost]
		// [Route("registerCompany")]
		// public async Task<ActionResult<Company>> RegisterCompany(UserContext _dbContext, Company request)
		// {
		//   var company = new Company
		//   {
		//     companyName = request.companyName,
		//     companyAddress = request.companyAddress,
		//     companyContactNumber = request.companyContactNumber
		//   };

		//   try
		//   {
		//     _dbContext.Company.Add(company);
		//     await _dbContext.SaveChangesAsync();
		//     return company;
		//   }
		//   catch (DbUpdateException e)
		//   {
		//     SqlException? innerException = e.InnerException as SqlException;
		//     if (innerException != null && (innerException.Number == 1062))
		//     {
		//       return null;
		//     }
		//     else
		//       throw;
		//     // return null;

		//   }
		// }

		static List<string> ConvertToStringList(string input)
		{
			string[] parts = input.Split(',');
			List<string> stringList = new List<string>(parts);

			return stringList;
		}

		[HttpGet]
		[Route("getListofUserNames")]

		public async Task<ActionResult<User>> SendUserNames()
		{
			GetCompanyNameClass getCompanyNameClass = new GetCompanyNameClass();
			var userName = await getCompanyNameClass.GetCompanyName(_connectionFactory);

			List<string> userNameList = ConvertToStringList(userName);

			List<string> companyNameList = new List<string>();

			foreach (var users in userNameList)
			{
				

				var companyId = _dbContext.Users
			   .Where(u => u.UserName == users)
			   .Select(u => u.companyId)
			   .FirstOrDefault();

				var companyName = _dbContext.Company
				.Where(c => c.companyId == companyId)
				.Select(c => c.companyName)
				.FirstOrDefault();

				companyNameList.Add(companyName);
			}

			return Ok(companyNameList);
		}
	}
}