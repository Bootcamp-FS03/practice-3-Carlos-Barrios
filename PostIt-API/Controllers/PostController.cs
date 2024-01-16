using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostIt_API.Models;
using PostIt_API.Services.Interfaces;


namespace PostIt_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Ok(_postService.GetAllPost());
        }

        [HttpGet("{userId}")]
        public IActionResult GetAllUserPosts(string userId)
        {
            var posts = _postService.GetAllUserPosts(userId);
            return posts != null ?
                Ok(posts) :
                NoContent();
        }

        [HttpPost]
        public IActionResult CreatePost([FromBody] Post post)
        {
            var _post = _postService.Create(post);
            return _post != null ?
                CreatedAtAction(nameof(CreatePost), new { _post}) :
                NoContent() ;
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePost([FromBody] Post post, string id)
        {
            var _post = _postService.Update(post);
            return _post != null ?
                Ok(_post) :
                NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _postService.Delete(id);
            return NoContent();
        }
    }
}
