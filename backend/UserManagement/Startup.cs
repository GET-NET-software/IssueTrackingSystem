using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.OpenApi.Models;
// using UserManagement.Models;
using Microsoft.EntityFrameworkCore;
using Use;
using JwtAuthenticationManager;
using UserManagement.RabbitMQ;

namespace UserManagement
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<UserContext>(options =>
		options.UseMySQL(Configuration.GetConnectionString("UserCs"))
	);
			services.AddControllers();

			services.AddScoped<JwtTokenHandler>();
			// services.AddScoped<UserContext>();////////
			services.AddCustomJwtAuthentication();

			// Add services for Swagger
			services.AddEndpointsApiExplorer();
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
			});

			services.AddCors(options =>
			{
				options.AddPolicy("AllowAll", builder =>
				{
					builder
						.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader();
				});
			});
			services.AddSingleton<RabbitMQConnectionFactory>();
			services.AddOcelot();

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();

				// Enable Swagger UI in development environment
				app.UseSwagger();
				app.UseSwaggerUI();
			}
			app.UseCors("AllowAll");
			app.UseRouting();

			// add authenticaation and authorisation
			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
				name: "Register",
				pattern: "{controller=auth}/{action=Register}");

				endpoints.MapControllerRoute(
				name: "Login",
				pattern: "{controller=auth}/{action=Login}");

				endpoints.MapControllerRoute(
				name: "Logout",
				pattern: "{controller=auth}/{action=Logout}");

				endpoints.MapControllerRoute(
				name: "CheckUser",
				pattern: "{controller=auth}/{action=CheckUser}");

				endpoints.MapControllerRoute(
				name: "GetCompany",
				pattern: "{controller=Company}/{action=GetCompany}");
			});

			app.UseOcelot();
		}
	}
}
