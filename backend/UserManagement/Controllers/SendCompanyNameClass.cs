using System.Text;
using UserManagement.RabbitMQ;
using RabbitMQ.Client;

namespace UserManagement.Controllers
{
	public class SendCompanyNameClass
	{
		public async void SendCompanyName(RabbitMQConnectionFactory _connectionFactory, string companyName, string userName)
		{
			var queueName = "CompanyName_"+userName;
			var connection = _connectionFactory.CreateConnection();
			var channel = connection.CreateModel();
			channel.QueueDeclare(
				// queue: "CompanyName",
				queue: queueName,
				durable: false,
				exclusive: false,
				autoDelete: false,
				arguments: null);

			var message = companyName;

			var encodedMessage = Encoding.UTF8.GetBytes(message);

			channel.BasicPublish("", queueName, null, encodedMessage);// Wait for the message to be received
		}
	}

}
