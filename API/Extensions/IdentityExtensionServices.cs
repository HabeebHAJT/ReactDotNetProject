using API.Services;
using Application.Acivities;
using Application.Core;
using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Runtime.CompilerServices;
using System.Text;

namespace API.Extensions
{
    public static class IdentityExtensionServices
    {

        public static IServiceCollection AddIdentityExtensionServices(this IServiceCollection services,IConfiguration config)
        {

            services.AddIdentityCore<AppUser>(opt=>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;

            }).AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {

                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            services.AddAuthorization(opt =>
            {

                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IHostRequirments());
                });
            });

            services.AddTransient<IAuthorizationHandler,IsHostRequirmentHandler>();
            services.AddScoped<TokenServices>();
            return services;
        }
    }
}
