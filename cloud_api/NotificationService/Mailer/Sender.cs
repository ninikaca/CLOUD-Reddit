using SendGrid;
using SendGrid.Helpers.Mail;
using System.Diagnostics;
using System.Threading.Tasks;

namespace NotificationService.Mailer
{
    public class Sender
    {
        public static async Task<bool> SendEmail(string message, string to, string subject)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("ninikaca@gmail.com", "cloud");
            var toEmail = new EmailAddress(to, to.Split('@')[0]);
            var plainTextContent = message;
            var htmlContent = "<strong>" + message + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, toEmail, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response.IsSuccessStatusCode;
        }
    }
}
