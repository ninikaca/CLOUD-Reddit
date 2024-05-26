using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Account;
using RedditDataRepository.AzureBlobCrud;
using RedditDataRepository.AzureTableCrud;
using RedditDataRepository.DTO;
using RedditDataRepository.Models;
using System.Threading.Tasks;
using System.Web.Http;

namespace RedditServiceWebRole.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly CloudTable users = Account.GetTable("users");

        [HttpPost]
        [Route("login")]
        public async Task<IHttpActionResult> Login(LoginData data)
        {
            try
            {
                if (ModelState.IsValid == false)
                    return BadRequest();
                else
                {
                    User user = await UsersCrud.ReadUser(users, data.Email);
                    if (user != null && user.Password == data.Password)
                        return Ok(CreateToken.Token(user.Email, user.Id));
                    else
                        return NotFound();
                }
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IHttpActionResult> Register(RegisterData data)
        {
            try
            {
                if (ModelState.IsValid == false)
                    return BadRequest();

                User user = await UsersCrud.ReadUser(users, data.Email);

                if (user == null)
                {
                    data.Image = await ImagesCrud.UploadImage(data.Image);
                    user = new User(data);
                    user = await UsersCrud.InsertUser(users, user);

                    if (user != null)
                        return Ok(CreateToken.Token(user.Email, user.Id));
                    else
                        return BadRequest();
                }
                else
                    return BadRequest();
            }
            catch
            {
                return InternalServerError();
            }
        }
    }
}
