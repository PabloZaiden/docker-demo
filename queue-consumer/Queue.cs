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
        public const string DefaultQueueURL = "http://localhost:8888/";
        private string QueueURL;

        public Queue() : this(DefaultQueueURL) {

        }

        public Queue(String url) {
            if (String.IsNullOrWhiteSpace(url)) {
                url = DefaultQueueURL;
            }

            QueueURL = url;
        }

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