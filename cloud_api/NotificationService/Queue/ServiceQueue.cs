using Microsoft.WindowsAzure.Storage.Queue;
using Microsoft.WindowsAzure.Storage.Table;
using NotificationService.AzureTableCrud;
using RedditDataRepository.Account;
using RedditDataRepository.AzureQueueCrud;
using System.Threading.Tasks;

namespace NotificationService.Queue
{
    public class ServiceQueue
    {
        private readonly static CloudQueue AdminNotificationQueue = Account.GetQueue("AdminNotificationQueue");
        private readonly static CloudTable adminsTable = Account.GetTable("administrators");

        public static async Task IsServiceOffline()
        {
            var message = await QueueCrud.ReadMessage(AdminNotificationQueue);
            if (message == null)
                return;

            try
            {
                if (message == null) return;

                // Send email for each administrator
                foreach (var administrator in await AdministratorsCrud.ReadAdministrators(adminsTable))
                {
                    await Mailer.Sender.SendEmail(message.AsString, administrator.Email, "Service outage information");
                }

                // Remove from admin queue
                await QueueCrud.DeleteMessage(AdminNotificationQueue, message);
            }
            catch
            {
                return;
            }
        }
    }
}
