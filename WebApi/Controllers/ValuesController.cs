using BL.Models;
using BL.Api;

using DAL.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using BL;
using DAL;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public IBLManager _bLManager;

        public ValuesController(IBLManager bLManager)
        {
            _bLManager = bLManager;
        }

        [HttpPost("login")]
        public IActionResult LogIn([FromBody] IDictionary<string, object> requestBody)
        {
            if (requestBody == null || !requestBody.ContainsKey("name") || !requestBody.ContainsKey("password"))
            {
                return BadRequest(new { message = "Name and password are required." });
            }

            string name = requestBody["name"].ToString();
            string passwordString = requestBody["password"].ToString();

            // המרת הסיסמה למספר אם זה מה שאתה רוצה
            if (!int.TryParse(passwordString, out int password))
            {
                return BadRequest(new { message = "Password must be a valid integer." });
            }

            // Call the login logic with the extracted name and password
            var result = _bLManager._blService.logIn(name, password);

            if (result != null)
            {
                return Ok(new { message = "Login successful." });
            }
            else
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] BlGymnast gymnast)
        {
            if (gymnast == null)
            {
                return BadRequest(new { message = "Registration data is required." });
            }

            // Check if required fields are present
            _bLManager._blService.signIn(gymnast);

            // החזרת תשובה מתאימה
            return Ok(new { message = "Sign in successful." }); // Return OK if data is received, actual registration logic is handled on the client side
        }
    }
}
