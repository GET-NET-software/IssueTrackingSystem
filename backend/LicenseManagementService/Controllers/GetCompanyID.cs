using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace LicenseManagementService.Controllers
{
    public class GetCompanyID
    {

        // extract the username from token
        private string GetCompanyIdFromToken(HttpContext httpContext)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("qwertyuiopASDFGHJKLzxcvbnmqwertyuiopASDFGHJKLzxcvbnm"); // Replace with your JWT secret key
            var tokenString = httpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            SecurityToken validatedToken;

            var claimsPrincipal = tokenHandler.ValidateToken(tokenString, tokenValidationParameters, out validatedToken);

            var companyIdClaim = claimsPrincipal.FindFirst("CompanyId");
            if (companyIdClaim != null)
            {
                return companyIdClaim.Value;
            }
            else
            {
                return null; // Username claim not found in the token
            }
        }

        public string GetCompanyId(HttpContext httpContext)
        {
            var companyID = GetCompanyIdFromToken(httpContext); // Call the GetUserNameFromToken method
            return companyID;
        }
    }
}
