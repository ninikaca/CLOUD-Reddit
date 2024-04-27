using HealthStatusService.AzureTableCrud;
using HealthStatusService.Models;
using HealthStatusService.Resampling;
using RedditDataRepository.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthStatusService.HealthCheck
{
    public class RetreiveHealthCheckData
    {
        public async static Task<(double, List<bool>)> RetreiveData()
        {
            double uptime = 0.0;
            List<bool> statuses = new List<bool>();

            try
            {
                List<HealthStatus> stats = await HealthStatusesCrud.ReadStatuses(Account.GetTable("HealthCheck"));
                DateTime now = DateTime.Now;
                DateTime hourBefore = now.AddHours(-1);

                List<HealthStatus> withinLastHour = stats.FindAll(s => s.Timestamp >= hourBefore && s.Timestamp <= now);
                statuses = withinLastHour.Select(x => x.IsRedditAvailable).ToList();
                statuses = DataResampler.ResampleData(statuses, 215);

                // Calculate percentage in last 24h
                int online = stats.Count(x => x.IsRedditAvailable == true && x.Timestamp >= now.AddHours(-24));
                int offline = stats.Count(x => x.IsRedditAvailable == false && x.Timestamp >= now.AddHours(-24));

                uptime = Math.Round(((1.0 * online) / (offline + online) * 100), 3);

                return (uptime, statuses);
            }
            catch (Exception)
            {
                return (0.0, new List<bool>());
            }
        }
    }
}