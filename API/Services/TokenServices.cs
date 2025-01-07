using API.DTOs;
using Domain;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Services
{
    public class TokenServices
    {
        private readonly IConfiguration configuration;

        public TokenServices(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateToken(AppUser user)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Email,user.Email)

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokendecriptor = new SecurityTokenDescriptor { 
                Subject=new ClaimsIdentity(claims),
                SigningCredentials = cred,
                Expires=DateTime.UtcNow.AddDays(7),
            };

            var tokenandler = new JwtSecurityTokenHandler();
            var token= tokenandler.CreateToken(tokendecriptor);



            return tokenandler.WriteToken(token);

        }
    }
}
