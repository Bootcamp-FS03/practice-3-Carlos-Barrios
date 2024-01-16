using Microsoft.AspNetCore.Mvc;
using PostIt_API.Models;
using PostIt_API.Services.Interfaces;
using PostIt_API.Utils;

namespace PostIt_API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{    
    private readonly IUserService _userService;

    public LoginController(IUserService userService )
    {
        _userService = userService;
    }

    [HttpPost]
    public IActionResult Post([FromBody] LoginModel credentials)
    {
        var user = _userService.GetUserByUsername(credentials.Username);

        if (user == null)
            return Unauthorized();

        if (AuthenticationService.ValidateCredentials(user, credentials.Password))
            return Ok(
                new { Token = AuthenticationService.CreateToken(user), 
                      User = user });
        else
            return Unauthorized(new {Message = "Wrong passwod" });
    }
}
