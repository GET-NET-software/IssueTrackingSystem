using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LicenseManagementService.Models;

namespace LicenseManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicensesController : ControllerBase
    {
        private readonly LicenseContext _context;

        public LicensesController(LicenseContext context)
        {
            _context = context;
        }

        // GET: api/Licenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<License>>> Getproducts()
        {
          if (_context.products == null)
          {
              return NotFound();
          }
            return await _context.products.ToListAsync();
        }

        // GET: api/Licenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<License>> GetLicense(string id)
        {
          if (_context.products == null)
          {
              return NotFound();
          }
            var license = await _context.products.FindAsync(id);

            if (license == null)
            {
                return NotFound();
            }

            return license;
        }

        // PUT: api/Licenses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLicense(string id, License license)
        {
            if (id != license.product_license)
            {
                return BadRequest();
            }

            _context.Entry(license).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LicenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Licenses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<License>> PostLicense(License license)
        {
          if (_context.products == null)
          {
              return Problem("Entity set 'LicenseContext.products'  is null.");
          }
            _context.products.Add(license);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LicenseExists(license.product_license))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLicense", new { id = license.product_license }, license);
        }

        // DELETE: api/Licenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLicense(string id)
        {
            if (_context.products == null)
            {
                return NotFound();
            }
            var license = await _context.products.FindAsync(id);
            if (license == null)
            {
                return NotFound();
            }

            _context.products.Remove(license);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LicenseExists(string id)
        {
            return (_context.products?.Any(e => e.product_license == id)).GetValueOrDefault();
        }
    }
}
