using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Text;

namespace QueueConsumer
{
    public class Queue
    {   
        private const string DefaultQueueURL = "http://localhost:8888/";
        private string QueueURL;
        
        public Queue() : this(DefaultQueueURL) {
            
        }
        
        public Queue(String url) {
            QueueURL = url;
        }
       
       /*
        public async Task Put(string queueName, JObject element) {
            using (var client = new HttpClient()) {

                var base64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(element)));
                StringContent content = new StringContent(base64);
                await client.PostAsync(QueueURL + "q/" + queueName, content);
            }    
        }
        */
        
        public async Task<JObject> Get(string queueName)
        {
            using (var client = new HttpClient()) {
                var url = QueueURL + "q/" + queueName;
                var serialized = await client.GetStringAsync(url);
                if (!String.IsNullOrWhiteSpace(serialized)) {
                    var jToken = JObject.Parse(serialized);
                    string base64 = jToken.Value<String>("value");
                    
                    string val = Encoding.UTF8.GetString(Convert.FromBase64String(base64));
                    var obj = JObject.Parse(val);
                    
                    return obj;
                } else {
                    return null;
                }
            }
        }
    }   
}