using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagement.Models;

namespace UserManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class accountControler : ControllerBase
    {

        private readonly UserContext _dbContext;

        public accountControler(UserContext dbContext)
        {
            _dbContext = dbContext; 
        }
        [HttpGet]
		[Route("GetUser")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            // return user;
            return Ok(user);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), user);
        }
    }
}
