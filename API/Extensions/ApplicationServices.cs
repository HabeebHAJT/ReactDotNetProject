using Application.Acivities;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photo;
using Infrastructure.Security;
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
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddScoped<IPhotoAccesor, PhotoAccessor>();
            return services;
        }
    }
}
