using System.Text;
using RabbitMQ.Client;
using Kanban.RabbitMQ;

public class SendSessionClass
{
	private readonly IConfiguration _configuration;
	private readonly ILogger<SendSessionClass> _logger;

	public SendSessionClass(IConfiguration configuration, ILogger<SendSessionClass> logger)
	{
		_configuration = configuration;
		_logger = logger;
	}

	public void SendSession(String FullName)
	{
		try
		{
			var _connectionFactory = new RabbitMQConnectionFactory(_configuration);
			// send session to other services
			using var connection = _connectionFactory.CreateConnection();
			using var channel = connection.CreateModel();
			channel.QueueDeclare(
				queue: "loginSession",
				durable: false,
				exclusive: false,
				autoDelete: false,
				arguments: null);

			var message = FullName;

			var encodedMessage = Encoding.UTF8.GetBytes(message);

			channel.BasicPublish("", "loginSession", null, encodedMessage);
			_logger.LogInformation("Session message sent successfully.");
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Error sending session message.");
		}
	}
}