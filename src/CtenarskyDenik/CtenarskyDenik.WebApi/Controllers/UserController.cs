using CtenarskyDenik.Core.Entities;
using CtenarskyDenik.Persistence;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;


namespace CtenarskyDenik.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest("E-mail je již registrován.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Registrace proběhla úspěšně.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var dbUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (dbUser == null || !BCrypt.Net.BCrypt.Verify(user.PasswordHash, dbUser.PasswordHash))
            {
                return Unauthorized("Špatný e-mail nebo heslo.");
            }

            // Generování tokenu (prozatím jednoduchý)
            var token = Guid.NewGuid().ToString();
            return Ok(new { Token = token, UserId = dbUser.UserId });
        }
    }
}
