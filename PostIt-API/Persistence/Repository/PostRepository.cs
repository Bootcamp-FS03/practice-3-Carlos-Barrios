using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using PostIt_API.Models;
using PostIt_API.Persistence.Interfaces;

namespace PostIt_API.Persistence.Repository;

public class PostRepository : IPostRepository
{
    private readonly IMongoCollection<PostDocument> _collection;

    public PostRepository(IMongoClient mongoClient, IMongoDbSettings connection)
    {
        _collection = mongoClient.GetDatabase(connection.Database)
            .GetCollection<PostDocument>("posts");
    }

    public List<Post> GetAllPost()
    {
        var allPosts = _collection.Find(_ => true)
                                  .FirstOrDefault()?.Posts
                                  .ToList();

        return allPosts ?? new List<Post>();
    }

    public List<Post> GetAllUserPosts(string userId)
    {
        var postsFromUser = _collection.Find(p => p.Posts.Any(post => post.UserId == userId))
                                       .FirstOrDefault()?.Posts
                                       .Where(post => post.UserId == userId)
                                       .ToList();

        return postsFromUser ?? new List<Post>();
    }

    public Post Create(Post post)
    {
        var filter = Builders<PostDocument>.Filter.Empty;
        var update = Builders<PostDocument>.Update.Push(p => p.Posts, post);

        var result = _collection.UpdateOne(filter, update, new UpdateOptions { IsUpsert = true });

        return post;
    }

    public Post Update(Post post)
    {
        var filter = Builders<PostDocument>.Filter.ElemMatch(x => x.Posts, p => p.Id == post.Id);
        var update = Builders<PostDocument>.Update
            .Set("posts.$.userId", post.UserId)
            .Set("posts.$.content", post.Content);

        _collection.UpdateOne(filter, update);

        return post;
    }

    public void Delete(string id)
    {
        var filter = Builders<PostDocument>.Filter.ElemMatch(x => x.Posts, p => p.Id == id);
        var update = Builders<PostDocument>.Update.PullFilter("posts", Builders<Post>.Filter.Eq("Id", id));

        var result = _collection.UpdateOne(filter, update);
    }

}
