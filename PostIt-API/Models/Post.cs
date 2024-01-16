using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PostIt_API.Models;

public class Post
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("userId")]
    public string UserId { get; set; }    
    
    [BsonElement("content")]
    public string Content { get; set; }
    
    [BsonElement("images")]
    public List<string>? Images { get; set; }

    public Post()
    {
        Id = ObjectId.GenerateNewId().ToString();
    }
}
