using AdminToolsConsoleApp.AzureTableCrud;
using AdminToolsConsoleApp.Models;
using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminToolsConsoleApp
{
    public class Program
    {
        private static List<Admin> admins = new List<Admin>();
        private static CloudTable adminsTable = Account.GetTable("admins");

        public static async Task Main()
        {
            // add initial admin
            await AdminsCrud.InsertAdmin(adminsTable, new Admin("Nini", "ninikaca@gmail.com", "123"));

            try
            {
                while (true)
                {
                    admins = await AdminsCrud.ReadAdmins(adminsTable);

                    // Authenticate
                    Console.Write("Email: ");
                    string email = Console.ReadLine();
                    Console.Write("Password: ");
                    string password = Console.ReadLine();

                    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                    {
                        continue;
                    }
                    else
                    {
                        if(admins.FirstOrDefault(x => x.Email == email && x.Password == password) != null)
                        {
                            Console.WriteLine("You have been authenticated!\n");
                            break;
                        }
                        else
                        {
                            Console.WriteLine("Invalid credentials has been provided!\n");
                            continue;
                        }
                    }
                }

                while (true)
                {
                    admins = await AdminsCrud.ReadAdmins(adminsTable);

                    Console.WriteLine("1) Add an Admin");
                    Console.WriteLine("2) View the Admins");
                    Console.WriteLine("3) Remove an Admin by Guid");
                    Console.WriteLine("q) Exit");
                    Console.Write("Enter your choice: ");
                    string res = Console.ReadLine();
                    Console.WriteLine();

                    if (res == "q")
                        break;
                    else if (res == "1")
                    {
                        Console.WriteLine("Enter Administrator Details:");
                        Console.Write("Name: ");
                        string name = Console.ReadLine();
                        Console.Write("Email: ");
                        string email = Console.ReadLine();
                        Console.Write("Password: ");
                        string password = Console.ReadLine();

                        Admin newAdmin = new Admin(name, email, password);
                        if ((await AdminsCrud.ReadAdmin(adminsTable, email) != null))
                        {
                            Console.WriteLine("Email is already in use!\n");
                            continue;
                        }
                        else
                        {
                            if ((await AdminsCrud.InsertAdmin(adminsTable, newAdmin) != null))
                            {
                                Console.WriteLine("Admin has been added successfully!\n");
                            }
                            else
                            {
                                Console.WriteLine("Error adding admin!\n");
                            }
                        }
                    }
                    else if (res == "2")
                    {
                        foreach (Admin admin in admins)
                        {
                            Console.WriteLine(admin);
                        }
                    }
                    else if (res == "3")
                    {
                        foreach (Admin admin in admins)
                        {
                            Console.WriteLine(admin);
                        }
                        Console.Write("Enter a Guid to begin deletion proccess: ");
                        string id = Console.ReadLine();

                        if (string.IsNullOrEmpty(id))
                        {
                            Console.WriteLine($"Admin {id} does not exist");
                        }

                        string rowKeyDeletion = admins.Where(a => a.Id == long.Parse(id)).FirstOrDefault()?.RowKey;

                        if (rowKeyDeletion != null)
                        {
                            if ((await AdminsCrud.DeleteAdmin(adminsTable, rowKeyDeletion)))
                            {
                                Console.WriteLine("Admin has been deleted successfully!\n");
                            }
                            else
                            {
                                Console.WriteLine($"Admin {id} does not exist");
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                Console.WriteLine("An error has been occured. Application is in faulting state!\n");
                Console.Write("Press any key to close an applicaiton...");
                Console.ReadKey();
            }
        }
    }
}
