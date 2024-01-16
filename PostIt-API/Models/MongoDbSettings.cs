using PostIt_API.Persistence.Interfaces;

namespace PostIt_API.Models;

public class MongoDbSettings : IMongoDbSettings
{
    public string Collection { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string Server { get; set; } = string.Empty;
}
