using BL.Api;
using BL.Service;
using Bl;
using BL;
using DAL.Api;
using DAL.Service;
using DAL;
using DAL.models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
    builder => builder.WithOrigins("http://localhost:5173")
    .AllowAnyMethod()
    .AllowAnyHeader());
});

builder.Services.AddAutoMapper(typeof(Mapping));
builder.Services.AddControllers();
builder.Services.AddSingleton<dbClass>();
builder.Services.AddSingleton<IBLManager, BLManager>();
builder.Services.AddSingleton<IDALManager, DALManager>();
builder.Services.AddSingleton<IDalService, DalService>(); // הוסף את DalService
builder.Services.AddSingleton<IBLService, BlService>(); // הוסף את BlService


var app = builder.Build();

app.UseCors("AllowSpecificOrigin");
app.MapGet("/", () => "Hello World!");
app.MapControllers();
app.Run();
