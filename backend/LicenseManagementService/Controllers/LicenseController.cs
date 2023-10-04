using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LicenseManagementService.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LicenseManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicenseController : ControllerBase
    {

        private readonly LicenseContext _context;
        private readonly GetCompanyID getcompanyid;


        public LicenseController(LicenseContext context)
        {
            _context = context;
            getcompanyid = new GetCompanyID();
        }



        // GET api/<LisenceController>/productNameOfCompany
        [HttpGet("productNameOfCompany")]
        [Authorize]
        public IActionResult Get()

        {
            var id = int.Parse(getcompanyid.GetCompanyId(HttpContext));
            // var id = 3;
            var value = _context.products
                .Include(v => v.products_by)
                .FirstOrDefault(v => v.companyId == id);

            if (value == null)
            {
                return NotFound("not found");
            }

            var realatedData = value.products_by;

            return Ok(new
            {
                ValueContent = value,
                RealatedDateContent = realatedData
            }) ;
        }

        // GET api/<LisenceController>/productNameofProduct/5
        [HttpGet("productNameByProductid/{id}")]
        public IActionResult GetProduct(int id)

        {
            var value = _context.products_by
                .FirstOrDefault(v => v.productId == id);

            if (value == null)
            {
                return NotFound("not found");
            }

            return Ok(value);
        }


        //---------------------------------------------------------------------------

        // GET: api/<LisenceController>
        [HttpGet]
        public IEnumerable<string> Gjket()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<LisenceController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<LisenceController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LisenceController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
