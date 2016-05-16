using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace QueueConsumer
{
    public class Webdis
    {
        
        private const string DefaultWebdisURL = "http://localhost:7379/";
        private string WebdisURL;
        
        public Webdis() : this(DefaultWebdisURL) {
            
        }
        
        public Webdis(String url) {
            if (String.IsNullOrWhiteSpace(url)) {
                url = DefaultWebdisURL;
            }
            WebdisURL = url;
        }
        
        public async Task Add(string listName, string element, byte[] content) {
            using (var client = new HttpClient()) {
                var binaryContent = new ByteArrayContent(content);
                
                var url = WebdisURL + "rpush/" + listName + "/" + element;
                await client.PutAsync(url, binaryContent);
            }    
        }
    }   
}