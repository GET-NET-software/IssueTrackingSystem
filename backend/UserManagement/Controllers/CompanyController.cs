using Microsoft.AspNetCore.Mvc;

namespace UserManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CompanyController : ControllerBase
    {
        private readonly UserContext _dbContext;
        private readonly GetList _getList;

        public CompanyController(UserContext dbContext)
        {
            _dbContext = dbContext;
            _getList = new GetList(_dbContext);
        }

        // return company list
        [HttpGet]
        [Route("getCompanies")]
        public IActionResult GetCompany()
        {
            var companies = _getList.GetCompanyNames();
            return Ok(companies);
        }
	}
}
