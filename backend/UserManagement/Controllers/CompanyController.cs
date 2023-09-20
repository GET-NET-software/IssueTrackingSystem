using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagement.Models;
using UserManagement.DTOs;
using NuGet.Protocol.Plugins;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace UserManagement.Controllers
{
    public class CompanyController : ControllerBase
    {
        private readonly UserContext _dbContext;
        private readonly GetCompanyNameList _getCompanyNameList;

        public CompanyController(UserContext dbContext)
        {
            _dbContext = dbContext;
            //_getCompanyNameList = getCompanyNameList;
            _getCompanyNameList = new GetCompanyNameList();
        }
        // return company list
        [HttpGet]
        [Route("getCompanies")]
        public IActionResult GetCompany()
        {
            var companyNames = _getCompanyNameList.GetAllCards();
            return Ok(companyNames);
        }
    }
}
