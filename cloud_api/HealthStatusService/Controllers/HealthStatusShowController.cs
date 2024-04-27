using HealthStatusService.HealthCheck;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace HealthStatusService.Controllers
{
    public class HealthStatusShowController : Controller
    {
        public async Task<ActionResult> Index()
        {
            (double uptime, List<bool> stats) = await RetreiveHealthCheckData.RetreiveData();
            ViewBag.uptime = uptime;
            ViewBag.uptimePercentage = Math.Round(uptime, 0).ToString() + "%";
            ViewBag.uptimeClass = GetUptimeClass(uptime);
            ViewBag.stats = stats;
            return View();
        }

        private string GetUptimeClass(double uptime)
        {
            if (uptime > 90)
                return "bg-success text-success";
            else if (uptime >= 80)
                return "bg-warning text-warning";
            else
                return "bg-danger text-danger";
        }
    }
}