using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RedditDataRepository.Account
{
    public class CreateToken
    {
        public static readonly string _secretKey = "NINIKACAGMAILKOMNINININIKACAKACAKACAKACA";

        public static string Token(string email, string user_id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim(ClaimTypes.Email, email),
                        new Claim("Id", user_id)
                    }
                ),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = "ninikaca",
                Audience = "kac",
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
