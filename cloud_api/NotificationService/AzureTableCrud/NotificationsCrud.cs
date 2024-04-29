using Microsoft.WindowsAzure.Storage.Table;
using NotificationService.Models;
using System.Threading.Tasks;

namespace NotificationService.AzureTableCrud
{
    public class NotificationsCrud
    {
        public static async Task<Notification> InsertNotification(CloudTable table, Notification notification)
        {
            if (table == null || notification == null)
                return null;

            TableOperation insertOperation = TableOperation.InsertOrMerge(notification);
            return (await table.ExecuteAsync(insertOperation)).Result as Notification;
        }
    }
}
