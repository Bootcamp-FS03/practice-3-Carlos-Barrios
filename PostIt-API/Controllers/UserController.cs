using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PostIt_API.Models;
using PostIt_API.Services.Interfaces;

namespace PostIt_API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;       
    }

    [HttpPost]
    public IActionResult Create([FromBody] User user)
    {
        var _user = _userService.Create(user);

        return _user == null ? 
            Conflict(new { Message = "Username already exists"}) :
            CreatedAtAction(nameof(Create), new { id = _user.Id }, _user);
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllUsers()
    {
        var users = _userService.GetAllUsers();
        return users.Count >0 ? 
            Ok(users) :
            NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] User user, string id)
    {
        var _user = _userService.Update(user);
        return _user != null ?
            Ok(_user) 
            : NoContent();
    }
}
