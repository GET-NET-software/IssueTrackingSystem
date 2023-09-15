using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.OpenApi.Models;
using UserManagement.Models;
using System.Configuration;
using Microsoft.EntityFrameworkCore;

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

			services.AddOcelot();

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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

			// app.UseEndpoints(endpoints =>
			// {
			//     endpoints.MapGet("/", async context =>
			//     {
			//         await context.Response.WriteAsync("Hello World!");
			//     });
			// });

			await app.UseOcelot();
		}
	}
}