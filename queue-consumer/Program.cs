using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace QueueConsumer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var task = Task.Run(ReadFromQueue);
            task.GetAwaiter().GetResult();
        }
       
        private static async Task ReadFromQueue() 
        {
            var envQueueURL = Environment.GetEnvironmentVariable("RESTMQ_URL");
            var envWebdisURL = Environment.GetEnvironmentVariable("WEBDIS_URL");
            
            Queue queue = new Queue(envQueueURL); // uses default queue: http://localhost:8888/
            Webdis webdis = new Webdis(envWebdisURL); //uses default webdis: http://localhost:7379/
            
            while (true) {
                dynamic element;
                System.Console.WriteLine("Waiting for new elements...");
                try {
                    while ((element = await queue.Get("myQueue")) != null) {
                        System.Console.WriteLine("Found new element!");
                        System.Console.WriteLine("Element name: " + element.Name);
                        //download the file
                        using (var client = new HttpClient())
                        {
                            System.Console.WriteLine("Downloading " + element.URL.ToString());
                            var content = await client.GetByteArrayAsync(element.URL.ToString());
                            
                            System.Console.WriteLine("File downloaded!");
                            
                            System.Console.WriteLine("Adding to webdis");
                            await webdis.Add("data", element.Name.ToString(), content);
                            System.Console.WriteLine("Added!");
                            System.Console.WriteLine();
                        }
                        
                    }
                } catch (Exception e) {
                    System.Console.WriteLine("Error: " + e.ToString());
                }
             
                Thread.Sleep(1000); // sleep for a second and re-check
            }
            
        }
    }
}
