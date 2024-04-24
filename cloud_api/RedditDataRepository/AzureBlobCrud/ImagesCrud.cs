using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using System;
using System.Threading.Tasks;

namespace RedditDataRepository.AzureBlobCrud
{
    public class ImagesCrud
    {
        public static async Task<string> UploadImage(string base64Image, string containerName = "images")
        {
            try
            {
                // Establishing storage connection
                var storageAccount = Account.Account.GetAccount();
                var blobClient = storageAccount.CreateCloudBlobClient();
                var container = blobClient.GetContainerReference(containerName);
                await container.CreateIfNotExistsAsync();

                // Enabling CORS
                await EnableCors(container);

                // Extracting image format and converting to byte array
                var (imageFormat, imageBytes) = ExtractImageData(base64Image);

                // Generating unique file name and uploading image data
                var blobUrl = await UploadImageData(container, imageFormat, imageBytes);

                return blobUrl;
            }
            catch (Exception)
            {
                return "";
            }
        }

        private static async Task EnableCors(CloudBlobContainer container)
        {
            var permissions = new BlobContainerPermissions
            {
                PublicAccess = BlobContainerPublicAccessType.Container
            };
            await container.SetPermissionsAsync(permissions);

            var serviceProperties = container.ServiceClient.GetServiceProperties();
            serviceProperties.Cors.CorsRules.Clear();
            serviceProperties.Cors.CorsRules.Add(new CorsRule
            {
                AllowedOrigins = new[] { "*" },
                AllowedMethods = CorsHttpMethods.Get,
                AllowedHeaders = new[] { "*" },
                ExposedHeaders = new[] { "*" },
                MaxAgeInSeconds = 3600
            });
            container.ServiceClient.SetServiceProperties(serviceProperties);
        }

        private static (string format, byte[] data) ExtractImageData(string base64Image)
        {
            var base64Parts = base64Image.Split(',');
            var format = base64Parts[0].Split(':')[1].Split(';')[0].Split('/')[1];
            var data = Convert.FromBase64String(base64Parts[1]);
            return (format, data);
        }

        private static async Task<string> UploadImageData(CloudBlobContainer container, string imageFormat, byte[] imageBytes)
        {
            var fileName = $"{Guid.NewGuid()}.{imageFormat}";
            var blob = container.GetBlockBlobReference(fileName);
            await blob.UploadFromByteArrayAsync(imageBytes, 0, imageBytes.Length);
            return blob.Uri.ToString();
        }
    }
}
