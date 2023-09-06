using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Swashbuckle.Application;

var builder = WebApplication.CreateBuilder(args);

//1.
builder.Configuration.SetBasePath(builder.Environment.ContentRootPath).AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
//2.
builder.Services.AddOcelot();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.UseOcelot().Wait();

app.Run();



