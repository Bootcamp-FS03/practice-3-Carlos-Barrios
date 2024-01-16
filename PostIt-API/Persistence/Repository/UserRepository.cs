using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using PostIt_API.Models;
using PostIt_API.Persistence.Interfaces;

namespace PostIt_API.Persistence.Repository;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<UserDocument> _collection;

    public UserRepository(IMongoClient mongoClient, IMongoDbSettings connection)
    {
        _collection = mongoClient.GetDatabase(connection.Database)
            .GetCollection<UserDocument>("users");
    }

    public User Create(User user)
    {
        var filter = Builders<UserDocument>.Filter.Empty;
        var update = Builders<UserDocument>.Update.Push(u => u.Users, user);

        var result = _collection.UpdateOne(filter, update, new UpdateOptions { IsUpsert = true });

        return user;
    }

    public User GetUserByUsername(string username)
    {
        return _collection.Find(u => u.Users.Any(user => user.Username == username))
            .FirstOrDefault()?.Users?.FirstOrDefault(u => u.Username == username);
    }

    public List<User> GetAllUsers()
    {
        var allUsers = _collection.Find(_ => true)
                                  .FirstOrDefault()?.Users
                                  .ToList();

        return allUsers ?? new List<User>();
    }

    public User Update(User user)
    {
        var filter = Builders<UserDocument>.Filter.ElemMatch(x => x.Users, u => u.Id == user.Id);
        var update = Builders<UserDocument>.Update
            .Set("users.$.name", user.Name)
            .Set("users.$.lastname", user.Lastname)
            .Set("users.$.username", user.Username)
            .Set("users.$.email", user.Email)
            .Set("users.$.password", user.Password);

        _collection.UpdateOne(filter, update);

        return user;
    }
}
