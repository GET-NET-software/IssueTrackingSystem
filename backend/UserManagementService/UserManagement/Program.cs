using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using UserManagement.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<UserContext>(options =>
options.UseMySQL(builder.Configuration.GetConnectionString("UserCs"))
);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// for session handling
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();	// option can be setted up to destroy the session
var app = builder.Build();
app.UseSession();	// session middleware

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
