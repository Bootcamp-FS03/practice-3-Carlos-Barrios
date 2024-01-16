using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PostIt_API.Models;

public class PostDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("posts")]
    public List<Post> Posts { get; set; } = new List<Post>();
}
