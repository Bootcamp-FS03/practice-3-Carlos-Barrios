﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PostIt_API.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }
    
    [BsonElement("lastname")]
    public string Lastname { get; set; }
    
    [BsonElement("email")]
    public string Email { get; set; }
    
    [BsonElement("username")]
    public string Username { get; set; }

    [BsonElement("password")]
    public string Password { get; set; }

    [BsonElement("profilePicture")]
    public string? ProfilePicture { get; set; }

    public User()
    {
        Id = ObjectId.GenerateNewId().ToString();
    }
}
