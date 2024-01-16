using PostIt_API.Models;
using PostIt_API.Persistence.Interfaces;
using PostIt_API.Services.Interfaces;
using PostIt_API.Utils;

namespace PostIt_API.Services.ServicesImp;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository userRepository)
    {
        _repository = userRepository;
    }

    public User Create(User user)
    {

        var _user = GetUserByUsername(user.Username);

        if (_user != null)
            return null;

        string imagePath = string.Empty;
        if (!string.IsNullOrEmpty(user.ProfilePicture))
            imagePath = ImageProcessing.SavePicture(user.Id, user.ProfilePicture, "Users");

        user.Password = HashService.HashPassword(user.Password);
        user.ProfilePicture = imagePath;
        return _repository.Create(user);
    }

    public User GetUserByUsername(string username)
    {
        return _repository.GetUserByUsername(username);
    }


    public List<User> GetAllUsers()
    {
        return _repository.GetAllUsers();
    }

    public User Update(User user)
    {
        return _repository.Update(user);
    }
}
