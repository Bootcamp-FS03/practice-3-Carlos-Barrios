using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PostIt_API.Models;

public class UserDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("users")]
    public List<User> Users { get; set; } = new List<User>();
}
