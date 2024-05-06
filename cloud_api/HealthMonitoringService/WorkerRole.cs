using HealthMonitoringService.AzureTableCrud;
using HealthMonitoringService.Models;
using Microsoft.WindowsAzure.ServiceRuntime;
using RedditDataRepository.Account;
using RedditDataRepository.AzureQueueCrud;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace HealthMonitoringService
{
    public class WorkerRole : RoleEntryPoint
    {
        private readonly CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        private readonly ManualResetEvent runCompleteEvent = new ManualResetEvent(false);

        public override void Run()
        {
            Trace.TraceInformation("HealthMonitoringService is running");

            try
            {
                this.RunAsync(this.cancellationTokenSource.Token).Wait();
            }
            finally
            {
                this.runCompleteEvent.Set();
            }
        }

        public override bool OnStart()
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            ServicePointManager.DefaultConnectionLimit = 12;
            bool result = base.OnStart();
            Trace.TraceInformation("HealthMonitoringService has been started");
            return result;
        }

        public override void OnStop()
        {
            Trace.TraceInformation("HealthMonitoringService is stopping");

            this.cancellationTokenSource.Cancel();
            this.runCompleteEvent.WaitOne();

            base.OnStop();

            Trace.TraceInformation("HealthMonitoringService has stopped");
        }

        private async Task RunAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                Trace.TraceInformation("Checking health...");

                bool notification = await HealthCheckService.NotificationHealthCheckService.RunCheck();
                bool reddit = await HealthCheckService.RedditHealthCheckService.RunCheck();

                HealthStatus status = new HealthStatus(reddit, notification);
                await HealthStatusesCrud.InsertStatus(Account.GetTable("HealthCheck"), status);

                // Create a message for email
                string emailBody = "";

                if (!reddit) emailBody += "Reddit is offline.\n";
                if (!notification) emailBody += "Notification is offline.\n";

                // Add email into queue
                if (emailBody != "") await QueueCrud.AddToQueue(Account.GetQueue("AdminNotificationQueue"), emailBody);

                await Task.Delay(5000);
            }
        }
    }
}
