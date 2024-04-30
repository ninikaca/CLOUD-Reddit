using Microsoft.WindowsAzure.Storage.Queue;
using Microsoft.WindowsAzure.Storage.Table;
using NotificationService.AzureTableCrud;
using NotificationService.Models;
using RedditDataRepository.Account;
using RedditDataRepository.AzureQueueCrud;
using RedditDataRepository.AzureTableCrud;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NotificationService.Queue
{
    public class CommentsQueue
    {
        private readonly static CloudQueue CommentNotificationsQueue = Account.GetQueue("notifications");
        private readonly static CloudTable commentsTable = Account.GetTable("comments");
        private readonly static CloudTable usersTable = Account.GetTable("users");
        private readonly static CloudTable subsTable = Account.GetTable("subscriptions");
        private readonly static CloudTable notificationsTable = Account.GetTable("notifications");

        public static async Task IsCommentAvailableForSend()
        {
            var message = await QueueCrud.ReadMessage(CommentNotificationsQueue);
            if (message == null)
                return;

            var comment = await CommentsCrud.ReadComment(commentsTable, message.AsString);
            if (comment == null) return;

            var subs = await SubscriptionCrud.ReadSubscriptionsForPost(subsTable, comment.PostId);

            var emails = new List<string>();
            foreach (var sub in subs)
            {
                var user = await UsersCrud.ReadUserById(usersTable, sub.UserId);
                emails.Add(user.Email);
            }

            // Send all emails
            int sent = 0;
            foreach (var email in emails)
            {
                await Mailer.Sender.SendEmail(comment.Content, email, "New comment has been added on post");
                sent++;
            }

            // Save notification info how much emails has been sent
            Notification notification = new Notification(comment.RowKey, sent);
            await NotificationsCrud.InsertNotification(notificationsTable, notification);

            // Remove from queue
            await QueueCrud.DeleteMessage(CommentNotificationsQueue, message);
        }
    }
}
