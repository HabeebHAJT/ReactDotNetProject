using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
  
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public UserManager<AppUser> _userManager { get; }
        public TokenServices _tokenServices { get; }

        public AccountController(UserManager<AppUser> userManager,TokenServices tokenServices)
        {
            _userManager = userManager;
            _tokenServices = tokenServices;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user= await _userManager.Users
                .Include(m=>m.Photos)
                .FirstOrDefaultAsync(m=>m.Email== loginDto.Email);
            if (user == null)
                return Unauthorized();
            var passwordcheck = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!passwordcheck) 
                return Unauthorized();


            return CreateUserDto(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto register)
        {
          
            if (await _userManager.Users.AnyAsync(m=>m.UserName == register.UserName))
            {
                ModelState.AddModelError("username", "UserName already taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(m => m.Email == register.Email))
            {
                ModelState.AddModelError("email", "Email already taken");
                return ValidationProblem();
            }


            var user = new AppUser
            {
                UserName = register.UserName,
                DisplayName = register.DisplayName,
                Email = register.Email,

            };

            var create = await _userManager.CreateAsync(user, register.Password);
            if (!create.Succeeded)
                return BadRequest(create.Errors);


            return CreateUserDto(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrnentUser()
        {
            var user = await _userManager.Users.Include(m=>m.Photos)
                .FirstOrDefaultAsync(m=>m.UserName== User.FindFirstValue(ClaimTypes.Email));

            if (user ==null)
                return BadRequest("UserName already taken");

            return CreateUserDto(user);
        }

        private UserDto CreateUserDto(AppUser user)
        {
            return new UserDto
            {
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Image = user?.Photos?.FirstOrDefault(m=>m.IsMain==true)?.Url,
                Token = _tokenServices.CreateToken(user)
            };
        }
    }
}
