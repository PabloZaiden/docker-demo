import request = require('request');

export class Queue {
    
    private defaultUrl : string = "http://localhost:8888/";
    
    private queueUrl : string;
    
    public constructor(url : string) {
        if (url == null) {
            url = this.defaultUrl;
        }
        
        this.queueUrl = url;
    }
    
    public add(queueName : string, obj : any) : void {
        
        let postURL = this.queueUrl + "q/" + queueName;
        let content = new Buffer(JSON.stringify(obj), 'utf8').toString('base64');
        
        request.post({
            url: postURL,
            form: {value: content} 
        },
        function (error, response, body) {
            if (error || (response != undefined && response.statusCode != 200)) {
            if (response != undefined) {
                console.log("Status code: " + response.statusCode);
                console.log("Error: " + error);
            }
            console.log("body: " + body);
            } 
        });
    }
}