using RabbitMQ.Client;
using Microsoft.Extensions.Configuration;

namespace UserManagement.RabbitMQ
{
	public class RabbitMQConnectionFactory
	{
		private readonly ConnectionFactory _factory;

		public RabbitMQConnectionFactory(IConfiguration configuration)
		{
			var config = configuration.GetSection("RabbitMQ");
			_factory = new ConnectionFactory
			{
				HostName = config["HostName"],
				Port = int.Parse(config["Port"]),
				UserName = config["UserName"],
				Password = config["Password"]
			};
		}

		public IConnection CreateConnection()
		{
			return _factory.CreateConnection();
		}
	}
}
