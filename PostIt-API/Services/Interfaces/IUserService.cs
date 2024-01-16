using PostIt_API.Models;
using PostIt_API.Persistence.Repository;

namespace PostIt_API.Services.Interfaces;

public interface IUserService
{
    User Create(User user);

    User GetUserByUsername(string username);

    List<User> GetAllUsers();

    User Update(User user);
}
