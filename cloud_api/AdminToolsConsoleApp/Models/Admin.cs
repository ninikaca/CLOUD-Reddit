using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace AdminToolsConsoleApp.Models
{
    public class Admin : TableEntity
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public Admin()
        {
            PartitionKey = "Admin";
            Id = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
        }

        public Admin(string name, string email, string password)
        {
            PartitionKey = "Admin";
            RowKey = email;
            Id = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            Name = name;
            Email = email;
            Password = password;
        }

        public override string ToString()
        {
            return $"`````````````````````````````````````````````````````\n" +
                   $"ID       : {Id}\n" +
                   $"Name     : {Name}\n" +
                   $"Email    : {Email}\n" +
                   $"Password : {new string('*', Password.Length)}\n" +
                   "`````````````````````````````````````````````````````\n";
        }
    }
}
