using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Account;
using RedditDataRepository.AzureBlobCrud;
using RedditDataRepository.AzureTableCrud;
using RedditDataRepository.DTO;
using RedditDataRepository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace RedditServiceWebRole.Controllers
{
    [RoutePrefix("api/posts")]
    public class PostsController : ApiController
    {
        private readonly CloudTable posts = Account.GetTable("posts");

        [HttpPost]
        [Route("all")]
        public async Task<IHttpActionResult> ReadPosts(PostQueryData data)
        {
            try
            {
                List<Post> fetched_posts = await PostsCrud.ReadPosts(posts);

                // Filter by title and author
                fetched_posts = PostsCrud.ApplyFilters(fetched_posts, data);

                // Apply sorting
                fetched_posts = PostsCrud.ApplySort(fetched_posts, data);

                // Paginate result and get related comments, votes and subscriptions
                var final_posts = await PostsCrud.ApplyPaginationAndRelations(fetched_posts, data);

                return Ok(final_posts);
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            try
            {
                RetrivedPostsData retrivedPostsData = await PostsCrud.ReadRelatedPostData(posts, id);

                if (retrivedPostsData != null)
                    return Ok(retrivedPostsData);
                else
                    return NotFound();
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
                if (await PostsCrud.DeletePost(posts, id))
                    return Ok();
                else
                    return NotFound();
            }
            catch
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("create")]
        [ValidateToken]
        public async Task<IHttpActionResult> Insert(PostData data)
        {
            try
            {
                if (ModelState.IsValid == false)
                    return BadRequest();

                if (data.Image != "")
                {
                    data.Image = await ImagesCrud.UploadImage(data.Image);
                    
                    // Image upload has been failed
                    if (data.Image == "")
                        return BadRequest();
                }
                Post post = await PostsCrud.InsertPost(posts, new Post(data));
                if (post != null)
                    return Ok(post.RowKey);
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
