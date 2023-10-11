using System.Text;
using issuemodule.RabbitMQ;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace issuemodule.Controllers
{
	public class GetCompanyNameClass
	{
		public async Task<string> GetCompanyName(RabbitMQConnectionFactory _connectionFactory)
		{
			var connection = _connectionFactory.CreateConnection();
			var channel = connection.CreateModel();
			channel.QueueDeclare(
				queue: "CompanyName",
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

			channel.BasicConsume(queue: "CompanyName", autoAck: true, consumer: consumer);
			var companyName = await tcs.Task; // Wait for the message to be received

			return companyName;
		}
	}

}
