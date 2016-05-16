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
            WebdisURL = url;
        }
        
        public async Task Add(string listName, string element, byte[] content) {
            using (var client = new HttpClient()) {
                var binaryContent = new ByteArrayContent(content);
                
                var url = WebdisURL + "rpush/" + listName + "/" + element;
                await client.PutAsync(url, binaryContent);
            }    
        }
        
        /*
        public async Task<String[]> GetAllElements(string listName) 
        {
            using (var client = new HttpClient()) {
                var serialized = await client.GetStringAsync(WebdisURL + "lrange/" + listName + "/0/-1");
                
                if (!String.IsNullOrWhiteSpace(serialized)) {
                    var obj = JObject.Parse(serialized);
                    
                    var list = obj["lrange"].Values<String>();
                    
                    return list.ToArray();
                } else {
                    return null;
                }
            }
        }
        
        public async Task<Byte[]> GetElement(string listName, int index) 
        {
            using (var client = new HttpClient()) {
                var content = await client.GetByteArrayAsync(WebdisURL + "lrange/" + listName + "/" + index + "/" + index + "?type=image");
                return content;
            }
        }
        */
        
    }   
}