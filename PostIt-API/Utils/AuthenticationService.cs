using Microsoft.IdentityModel.Tokens;
using PostIt_API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PostIt_API.Utils;

public class AuthenticationService
{
    private static IConfiguration _configuration;

    public static void Initialize(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public static bool ValidateCredentials(User user, string password)
    {
        if (user.Password.Equals(HashService.HashPassword(password)))
            return true;
        return false;
    }

    public static string CreateToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]));
        var signingCredentials = new SigningCredentials(
            securityKey, SecurityAlgorithms.HmacSha256);

        var claimsForToken = new List<Claim>();
        claimsForToken.Add(new Claim("sub", user.Id.ToString()));
        claimsForToken.Add(new Claim("given_name", user.Name));
        claimsForToken.Add(new Claim("family_name", user.Lastname));

        var jwtSecurityToken = new JwtSecurityToken(
            _configuration["Authentication:Issuer"],
            _configuration["Authentication:Audience"],
            claimsForToken,
            DateTime.UtcNow,
            DateTime.UtcNow.AddHours(3),
            signingCredentials);

        var tokenToReturn = new JwtSecurityTokenHandler()
           .WriteToken(jwtSecurityToken);

        return tokenToReturn;
    }
}
