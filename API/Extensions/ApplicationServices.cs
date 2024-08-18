using Application.Acivities;
using Application.Core;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Runtime.CompilerServices;

namespace API.Extensions
{
    public static class ApplicationServices
    {

        public static IServiceCollection AddApplicationService(this IServiceCollection services,IConfiguration config)
        {


            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnectionString"));
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddCors(opt => {
                opt.AddPolicy("CorePolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });

            });
            services.AddMediatR(m => m.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfile).Assembly);

            return services;
        }
    }
}
