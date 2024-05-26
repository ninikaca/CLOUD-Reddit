using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Account;
using RedditDataRepository.AzureTableCrud;
using RedditDataRepository.DTO;
using RedditDataRepository.Models;
using System.Threading.Tasks;
using System.Web.Http;

namespace RedditServiceWebRole.Controllers
{
    [RoutePrefix("api/votes")]
    public class VotesController : ApiController
    {
        private readonly CloudTable votes = Account.GetTable("votes");

        [HttpPost]
        [Route("vote")]
        [ValidateToken]
        public async Task<IHttpActionResult> Vote(VoteData data)
        {
            try
            {
                Vote exists = await VotesCrud.ReadVoteForPostAndUser(votes, data.PostId, data.UserId);

                if (exists == null)
                {
                    if ((await VotesCrud.InsertVote(votes, new Vote(data.UserId, data.PostId, data.IsUpvoted)) != null))
                        return Ok();
                    else
                        return BadRequest();
                }
                else
                {
                    // Just update is upvoted field
                    exists.IsUpvoted = data.IsUpvoted;

                    if ((await VotesCrud.UpdateVote(votes, exists.RowKey, exists) != null))
                        return Ok();
                    else
                        return BadRequest();
                }
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("remove")]
        [ValidateToken]
        public async Task<IHttpActionResult> Remove(VoteData data)
        {
            try
            {
                Vote vote = await VotesCrud.ReadVoteForPostAndUser(votes, data.PostId, data.UserId);

                if (vote == null)
                {
                    return NotFound();
                }
                else
                {
                    if (await VotesCrud.DeleteVote(votes, vote.RowKey))
                        return Ok();
                    else
                        return BadRequest();
                }
            }
            catch
            {
                return InternalServerError();
            }
        }
    }
}
