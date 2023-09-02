using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
//using Swashbuckle.Application;
using Kanban.Models;
using Kanban.RabbitMQ;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DashboardContext>(options =>
{
    string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (connectionString != null)
    {
        options.UseMySQL(connectionString!);
    }
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Addind dependency registration for RabbitMQ
builder.Services.AddSingleton<RabbitMQConnectionFactory>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   //app.UseSwagger();
 //  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
