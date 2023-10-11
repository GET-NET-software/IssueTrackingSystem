using System.Text;
using issuemodule.RabbitMQ;
using RabbitMQ.Client;

namespace issuemodule.Controllers
{
	public class SendUserNameClass
	{
		public async void SendUserName(RabbitMQConnectionFactory _connectionFactory, List<String> userName)
		{
			var queueName = "UserName";
			var connection = _connectionFactory.CreateConnection();
			var channel = connection.CreateModel();
			channel.QueueDeclare(
				// queue: "CompanyName",
				queue: queueName,
				durable: false,
				exclusive: false,
				autoDelete: false,
				arguments: null);

			var message = string.Join(",", userName); 

			var encodedMessage = Encoding.UTF8.GetBytes(message);
			

			channel.BasicPublish("", queueName, null, encodedMessage);// Wait for the message to be received
		}
	}

}
