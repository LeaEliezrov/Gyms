using BL.Service;
using DAL.Api;
using DAL.Models;
using DAL.Service;
using WebApi;
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
builder.Services.AddSingleton<IDalService, DalService>();
builder.Services.AddSingleton<IdbClass, dbClass>();
app.MapGet("/", () => "Hello World!");

app.Run();

