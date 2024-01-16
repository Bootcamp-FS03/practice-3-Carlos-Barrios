using PostIt_API.Models;
using PostIt_API.Persistence.Interfaces;
using PostIt_API.Services.Interfaces;
using PostIt_API.Utils;

namespace PostIt_API.Services.ServicesImp;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;

    public PostService(IPostRepository postRepository)
    {
        _postRepository = postRepository; 
    }

    public List<Post> GetAllPost()
    {
        return _postRepository.GetAllPost();
    }

    public List<Post> GetAllUserPosts(string userId)
    {
        return _postRepository.GetAllUserPosts(userId);
    }

    public Post Create(Post post)
    {
        if(post.Images != null && post.Images.Count> 0)
        {
            for (var i =1; i< post.Images.Count(); i++)
                ImageProcessing.SavePicture(post.Id, post.Images[i] + $"_{i}", "Posts");
        }
        return _postRepository.Create(post);
    }

    public void Delete(string id)
    {
        _postRepository.Delete(id);
    }

    
    public Post Update(Post post)
    {
        return _postRepository.Update(post);
    }
}
