using Microsoft.AspNetCore.Mvc;
using issuemodule.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using issuemodule.RabbitMQ;
using RabbitMQ.Client.Events;
using System.Text;
using RabbitMQ.Client;

namespace issuemodule.Controllers
{
	//[Route("api/[controller]")]
	// Add ApiController attribute for best practices
	[Route("api/[controller]")]

	public class DashboardController : ControllerBase
	{
		private BusinessLogic businessLogic;
		private readonly RabbitMQConnectionFactory _connectionFactory;
		public DashboardController(RabbitMQConnectionFactory connectionFactory)
		{
			// Create a new instance of the BusinessLogic object
			businessLogic = new BusinessLogic();
			_connectionFactory = connectionFactory;
		}

		//   GET: api/Dashboard
		[HttpGet]
		[Route("getallcards")]
		[Authorize(Roles = "Admin")]
		public IActionResult GetAll()
		{
			var userName = businessLogic.ListUserNames();
			SendUserNameClass sendUserNameClass = new SendUserNameClass();
			sendUserNameClass.SendUserName(_connectionFactory, userName);
			// senduser Senduser= new senduser();
			var cards = businessLogic.GetAllCards();
			return Ok(cards);

		}

		// GET: api/Dashboard/5
		[HttpGet("{id}")]
		[Authorize(Roles = "Admin")]
		public IActionResult Get(int id)
		{
			var card = businessLogic.GetCard(id);
			if (card == null)
				return NotFound();
			return Ok(card);
		}
		//retrieve cards by user
		[HttpGet]
		[Route("getallcardsforuser")]
		[Authorize]
		public async Task<IActionResult> GetAllCardsForUserAsync()
		{
			GetCompanyNameClass getCompanyNameClass = new GetCompanyNameClass();
			var companyName = await getCompanyNameClass.GetCompanyName(_connectionFactory);
			Console.WriteLine("****************" + companyName);
			// return Ok(companyName);

			// Get the current user's identifier from the JWT token
			var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

			// // Use the user ID to retrieve all cards associated with that user
			var cards = businessLogic.GetAllForUser(HttpContext); // Call the GetAllForUser method

			if (cards == null)
				return NotFound();

			return Ok(cards);
		}

		// POST: api/Dashboard
		[HttpPost]
		[Route("addissue")]
		[Authorize(Roles = "Client")]
		public IActionResult Post([FromBody] Card card)
		{
			businessLogic = new BusinessLogic();
			businessLogic.AddCard(card,HttpContext);
			return CreatedAtAction(nameof(Get), new { id = card.Id }, card);
		}

		// PUT: api/Dashboard/5
		[HttpPut]
		[Route("update/{id}")]
		[Authorize(Roles = "Admin, Client")]
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
		[Authorize(Roles = "Admin, Client")]
		public IActionResult Delete(int id)
		{
			var card = businessLogic.DeleteCard(id);
			if (card == null)
				return NotFound();
			return Ok(card);
		}
		[HttpPut("changestatus/{id}")]
		[Authorize(Roles = "Admin")]
		public IActionResult ChangeStatus(int id)
		{
			var updatedCard = businessLogic.ChangeStatusCard(id);

			if (updatedCard == null)
			{
				return NotFound(); // Return 404 Not Found if the card is not found
			}

			return Ok(updatedCard); // Return the updated card as the response
		}
	}

}

