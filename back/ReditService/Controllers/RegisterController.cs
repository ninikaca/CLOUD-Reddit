using ReditService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReditService.Controllers
{
    [RoutePrefix("auth")]
    public class RegisterController : ApiController
    {
        [Route("register")]
        [HttpPost]
        public IHttpActionResult Register(User user)
        {
            return Ok(user);
        }
    }
}
