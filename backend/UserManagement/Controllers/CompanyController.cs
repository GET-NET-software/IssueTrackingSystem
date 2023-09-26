using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using UserManagement.DTOs;
using NuGet.Protocol.Plugins;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Models;


namespace UserManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CompanyController : ControllerBase
    {
        private readonly UserContext _dbContext;
        private readonly GetCompanyNameList _getCompanyNameList;

        public CompanyController(UserContext dbContext)
        {
            _dbContext = dbContext;
            _getCompanyNameList = new GetCompanyNameList(_dbContext);
        }

        // return company list
        [HttpGet]
        [Route("getCompanies")]
        public IActionResult GetCompany()
        {
            var companies = _getCompanyNameList.GetCompanyNames();
            return Ok(companies);
        }
	}
}
