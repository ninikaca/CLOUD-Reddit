using Microsoft.WindowsAzure.Storage.Queue;
using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Account;
using RedditDataRepository.AzureQueueCrud;
using RedditDataRepository.AzureTableCrud;
using RedditDataRepository.DTO;
using RedditDataRepository.Models;
using System.Threading.Tasks;
using System.Web.Http;

namespace RedditServiceWebRole.Controllers
{
    [RoutePrefix("api/comment")]
    public class CommentsController : ApiController
    {
        private readonly CloudTable comments = Account.GetTable("comments");
        private readonly CloudQueue notifications = Account.GetQueue("notifications");

        [HttpPost]
        [Route("create")]
        [ValidateToken]
        public async Task<IHttpActionResult> Insert(CommentData data)
        {
            try
            {
                if (ModelState.IsValid == false)
                    return BadRequest();

                Comment comment = await CommentsCrud.InsertComment(comments, new Comment(data.PostId, data.UserId, data.Content));
                if (comment != null && await QueueCrud.AddToQueue(notifications, comment.RowKey)) // Add to cloud queue
                {
                    return Ok(comment);
                }
                else
                    return BadRequest();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [ValidateToken]
        public async Task<IHttpActionResult> Delete(string id)
        {
            try
            {
                if (ModelState.IsValid == false)
                    return BadRequest();

                if (await CommentsCrud.DeleteComment(comments, id))
                    return Ok();
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
