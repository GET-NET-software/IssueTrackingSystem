using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kanban.RabbitMQ;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Kanban.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SessionController : ControllerBase
	{
		private readonly RabbitMQConnectionFactory _connectionFactory;  // rabbitmq connection factory

		public SessionController(RabbitMQConnectionFactory connectionFactory)
		{
			_connectionFactory = connectionFactory;

		}

		[HttpGet("Check")]
		public async Task<IActionResult> Check()
		{
			using var connection = _connectionFactory.CreateConnection();
			using var channel = connection.CreateModel();
			channel.QueueDeclare(
				queue: "loginSession",
				durable: false,
				exclusive: false,
				autoDelete: false,
				arguments: null);

			var tcs = new TaskCompletionSource<string>(); // TaskCompletionSource to signal completion

			var consumer = new EventingBasicConsumer(channel);

			consumer.Received += (model, ea) =>
			{
				var body = ea.Body.ToArray();
				var message = Encoding.UTF8.GetString(body);
				tcs.SetResult(message); // Set the result when message is received
			};

			channel.BasicConsume(queue: "loginSession", autoAck: true, consumer: consumer);
			var userName = await tcs.Task; // Wait for the message to be received

			return Ok(userName);
		}
	}

}