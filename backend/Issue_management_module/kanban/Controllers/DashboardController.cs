using Microsoft.AspNetCore.Mvc;
using Kanban.Models;

namespace Kanban.Controllers
{
    //[Route("api/[controller]")]
    // Add ApiController attribute for best practices
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase // Inherit from ControllerBase instead of Controller
    {
        public BusinessLogic businessLogic; // Use readonly modifier
        private readonly ILogger<DashboardController> logger;
        private readonly DashboardContext context;
        public DashboardController(BusinessLogic businessLogic, ILogger<DashboardController> logger, DashboardContext context)
        {
            this.businessLogic = businessLogic;
            this.logger = logger;
            this.context = context;
        }


        //   GET: api/Dashboard
        [HttpGet]
        public IActionResult GetAll()
        {
            var cards = businessLogic.GetAllCards();
            return Ok(cards);
        }

        // GET: api/Dashboard/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var card = businessLogic.GetCard(id);
            if (card == null)
                return NotFound();
            return Ok(card);
        }

        // POST: api/Dashboard
        [HttpPost]
        public IActionResult Post([FromBody] Card card)
        {

            businessLogic.AddCard(card);
            return CreatedAtAction(nameof(Get), new { id = card.Id }, card);
        }

        // PUT: api/Dashboard/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] Card uCard)
        {
          var card = businessLogic.UpdateCard(uCard);
            if (card == null)
                return NotFound();
            return Ok(card);
        }

        // DELETE: api/Dashboard/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var card = businessLogic.DeleteCard(id);
            if (card == null)
                return NotFound();
            return Ok(card);
        }
     }
}

