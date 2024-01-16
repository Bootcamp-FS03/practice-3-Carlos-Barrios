namespace PostIt_API.Persistence.Interfaces;

public interface IMongoDbSettings
{
    string Collection { get; set; }
    string Database { get; set; }
    string Server { get; set; }
}
