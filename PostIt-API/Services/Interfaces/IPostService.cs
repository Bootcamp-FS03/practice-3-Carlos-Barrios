using PostIt_API.Models;

namespace PostIt_API.Services.Interfaces;

public interface IPostService
{
    List<Post> GetAllPost();

    List<Post> GetAllUserPosts(string userId);

    Post Create(Post post);

    Post Update(Post post);

    void Delete(string id);
}
