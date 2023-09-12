using Microsoft.AspNetCore.Mvc;
using issuemodule.Models;

namespace issuemodule.Controllers
{
    //[Route("api/[controller]")]
    // Add ApiController attribute for best practices
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase // Inherit from ControllerBase instead of Controller
    {
        private BusinessLogic businessLogic;
        public DashboardController()
        {
            // Create a new instance of the BusinessLogic object
            businessLogic = new BusinessLogic();
        }



        //   GET: api/Dashboard
        [HttpGet]
        [Route("getallcards")]
        public IActionResult GetAll()
        {
            var cards = businessLogic.GetAllCards();
            return Ok(cards);

        }

        // GET: api/Dashboard/5
        [HttpGet("{id}")]

        public IActionResult Get(int id)
        {
            var card = businessLogic.GetCard(id);
            if (card == null)
                return NotFound();
            return Ok(card);
        }
        // POST: api/Dashboard
        [HttpPost]
        [Route("addissue")]
        public IActionResult Post([FromBody] Card card)
        {
            businessLogic = new BusinessLogic();
            businessLogic.AddCard(card);
            return CreatedAtAction(nameof(Get), new { id = card.Id }, card);
        }

        // PUT: api/Dashboard/5
        [HttpPut]
        [Route("update/{id}")]

        public IActionResult Put(int id, [FromBody] Card uCard)
        {
            var card = businessLogic.UpdateCard(uCard);
            if (card == null)
                return NotFound();
            return Ok(card);
        }

        // DELETE: api/Dashboard/5
        [HttpDelete]
        [Route("remove/{id}")]
        public IActionResult Delete(int id)
        {
            var card = businessLogic.DeleteCard(id);
            if (card == null)
                return NotFound();
            return Ok(card);
        }
    }
}

