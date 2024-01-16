using PostIt_API.Models;

namespace PostIt_API.Persistence.Interfaces;

public interface IPostRepository
{
    List<Post> GetAllPost();

    List<Post> GetAllUserPosts(string userId);

    Post Create(Post post);

    Post Update(Post post);

    void Delete(string id);

}
