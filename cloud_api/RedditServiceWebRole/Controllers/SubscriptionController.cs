using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Account;
using RedditDataRepository.AzureTableCrud;
using RedditDataRepository.DTO;
using RedditDataRepository.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace RedditServiceWebRole.Controllers
{
    [RoutePrefix("api/subscriptions")]
    public class SubscriptionController : ApiController
    {
        private readonly CloudTable subscriptions = Account.GetTable("subscriptions");

        [HttpPost]
        [Route("subscribe")]
        [ValidateToken]
        public async Task<IHttpActionResult> Subscribe(SubscriptionData data)
        {
            try
            {
                List<Subscription> subs = await SubscriptionCrud.ReadSubscriptionsForPost(subscriptions, data.PostId);

                if (subs.FirstOrDefault(s => s.UserId == data.UserId) != null)
                    return BadRequest();

                if ((await SubscriptionCrud.InsertSubscription(subscriptions, new Subscription(data.PostId, data.UserId))) != null)
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
