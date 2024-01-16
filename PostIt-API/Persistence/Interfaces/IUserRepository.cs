using PostIt_API.Models;

namespace PostIt_API.Persistence.Interfaces;

public interface IUserRepository
{
    User Create(User user);

    User GetUserByUsername(string username);

    List<User> GetAllUsers();

    User Update(User user);
}
