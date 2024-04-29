using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace NotificationService.Models
{
    public class Administrator : TableEntity
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public Administrator()
        {
            PartitionKey = "Administrator";
            Id = Guid.NewGuid().ToString().Replace("-", "");
        }

        public Administrator(string name, string email, string password)
        {
            PartitionKey = "Administrator";
            RowKey = email;
            Id = Guid.NewGuid().ToString().Replace("-", "");
            Name = name;
            Email = email;
            Password = password;
        }
    }
}
