using Microsoft.IdentityModel.Tokens;
using RedditDataRepository.Account;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Mvc;
using System.Web.Routing;


namespace RedditServiceWebRole
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            _ = new Account();
        }
    }

    #region TOKEN VALIDATOR
    public class ValidateToken : AuthorizationFilterAttribute
    {
        private readonly string _secretKey = CreateToken._secretKey;

        public override async Task OnAuthorizationAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            if (!actionContext.Request.Headers.Contains("Authorization"))
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return;
            }

            string token = actionContext.Request.Headers.GetValues("Authorization").FirstOrDefault()?.Split(' ')[1];

            if (token == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return;
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secretKey);

                // Check if token is expired
                var validationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidIssuer = "ninikaca",
                    ValidAudience = "kac"
                };

                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

                Thread.CurrentPrincipal = principal;
                actionContext.RequestContext.Principal = principal;

                await base.OnAuthorizationAsync(actionContext, cancellationToken);
            }
            catch (SecurityTokenException)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "Invalid token");
            }
            catch (Exception ex)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
    #endregion
}
