using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Queue;
using Microsoft.WindowsAzure.Storage.Table;

namespace RedditDataRepository.Account
{
    public class Account
    {
        private static readonly CloudTableClient _tableClient;
        private static readonly CloudQueueClient _queueClient;
        private static CloudStorageAccount _account;

        static Account()
        {
            CloudStorageAccount storageAccount;

            if (CloudStorageAccount.TryParse(CloudConfigurationManager.GetSetting("DataConnectionString"), out storageAccount))
            {
                _account = storageAccount;
                _tableClient = storageAccount.CreateCloudTableClient();
                _queueClient = storageAccount.CreateCloudQueueClient();
            }
            else
            {
                CloudStorageAccount.TryParse("UseDevelopmentStorage=true", out storageAccount);
                _account = storageAccount;
                _tableClient = storageAccount.CreateCloudTableClient();
                _queueClient = storageAccount.CreateCloudQueueClient();
            }
        }

        public static CloudStorageAccount GetAccount()
        {
            return _account;
        }

        public static CloudTable GetTable(string tableName)
        {
            CloudTable table = _tableClient.GetTableReference(tableName.Trim().ToLower());
            table.CreateIfNotExistsAsync().GetAwaiter().GetResult();
            return table;
        }

        public static CloudQueue GetQueue(string queueName)
        {
            CloudQueue queue = _queueClient.GetQueueReference(queueName.Trim().ToLower());
            queue.CreateIfNotExistsAsync().GetAwaiter().GetResult();
            return queue;
        }
    }
}
