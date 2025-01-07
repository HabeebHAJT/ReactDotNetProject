using API.Extensions;
using API.Middleware;
using Application.Acivities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    var policy=new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));

});
builder.Services.AddApplicationService(builder.Configuration);
builder.Services.AddIdentityExtensionServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorePolicy");
app.UseHttpsRedirection();



app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope=app.Services.CreateScope();
var service = scope.ServiceProvider;

//try
//{
//    var context=service.GetRequiredService<DataContext>();
//    var usermanger=service.GetRequiredService<UserManager<AppUser>>();
//    await Seed.SeedData(context, usermanger);
//}
//catch(Exception ex)
//{

//}



app.Run();
