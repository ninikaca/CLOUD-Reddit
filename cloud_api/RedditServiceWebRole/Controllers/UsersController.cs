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
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly CloudTable users = Account.GetTable("users");

        [HttpGet]
        [Route("get/{id}")]
        [ValidateToken]
        public async Task<IHttpActionResult> Get(string id)
        {
            try
            {
                User user = await UsersCrud.ReadUserById(users, id);

                if (user != null)
                    return Ok(user);
                else
                    return NotFound();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpPatch]
        [Route("update")]
        [ValidateToken]
        public async Task<IHttpActionResult> Update(UpdateData data)
        {
            try
            {
                User user = await UsersCrud.ReadUserById(users, data.Id);

                if (user != null)
                {
                    // Check if email changed if changed check is unique
                    if(user.Email != data.Email)
                    {
                        // Check is email already in use
                        if ((await UsersCrud.ReadUser(users, data.Email) != null))
                            return BadRequest();
                    }

                    // If new profile photo provided, replace the old one
                    if (data.Image != null && data.Image != user.ImageUrl)
                    {
                        data.Image = await ImagesCrud.UploadImage(data.Image);

                        // Image failed to upload
                        if (data.Image == "")
                            return BadRequest();
                    }
                    else
                    {
                        // Keep old profile image if new one not imported
                        data.Image = user.ImageUrl;
                    }

                    User toUpdate = new User(data);
                    toUpdate.Id = user.Id; // Keep old id
                    user = await UsersCrud.UpdateUser(users, user.RowKey, toUpdate);

                    if (user != null)
                        return Ok(CreateToken.Token(user.Email, user.Id));
                    else
                        return BadRequest();

                }
                else
                    return NotFound();
            }
            catch
            {
                return InternalServerError();
            }
        }
    }
}
