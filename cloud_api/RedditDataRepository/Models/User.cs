using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.DTO;
using System;

namespace RedditDataRepository.Models
{
    public class User : TableEntity
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string ImageUrl { get; set; }

        public User()
        {
            PartitionKey = "User";
            Id = Guid.NewGuid().ToString();
        }

        public User(string name, string surname, string address, string city, string country, string phone, string email, string password, string imageBlobUrl)
        {
            PartitionKey = "User";
            RowKey = email;

            Id = Guid.NewGuid().ToString();
            Name = name;
            Surname = surname;
            Address = address;
            City = city;
            Country = country;
            Phone = phone;
            Email = email;
            Password = password;
            ImageUrl = imageBlobUrl;
        }

        public User(RegisterData data)
        {
            PartitionKey = "User";
            RowKey = data.Email;

            Id = Guid.NewGuid().ToString();
            Name = data.Name;
            Surname = data.Surname;
            Address = data.Address;
            City = data.City;
            Country = data.Country;
            Phone = data.Phone;
            Email = data.Email;
            Password = data.Password;
            ImageUrl = data.Image;
        }

        public User(UpdateData data)
        {
            PartitionKey = "User";
            RowKey = data.Email;

            Id = Guid.NewGuid().ToString();
            Name = data.Name;
            Surname = data.Surname;
            Address = data.Address;
            City = data.City;
            Country = data.Country;
            Phone = data.Phone;
            Email = data.Email;
            Password = data.Password;
            ImageUrl = data.Image;
        }
    }
}
