import request = require('request');
import http = require('http');

export interface IContentCallback {
    (content : Buffer) : void;
}

export interface IWebdisElementsResultCallback {
    (elements : WebdisElement[]) : void;
}

export class WebdisElement {
    public Name : string;
    public URL : string;
}

export class Webdis {
    private static defaultUrl : string = "http://localhost:7379/";

    private webdisUrl : string;

    public constructor(url : string) {
        if (url == null) {
            url = Webdis.defaultUrl;
        }

        this.webdisUrl = url;
    }

    public get(listName : string, callback : IWebdisElementsResultCallback) : void {
        let getUrl = this.webdisUrl + 'lrange/' + listName + '/0/-1';
  
        request.get(
            getUrl,
            function (error : any, response : http.IncomingMessage, body : any) {
                if (error || (response != undefined && response.statusCode != 200)) {
                    if (error) {
                        console.log("Error: " + error);
                    }
                    
                    if (response != undefined) {
                        console.log("Status code: " + response.statusCode);
                    }
                    
                    if (body != undefined) {
                        console.log("body: " + body);
                    }
                } else {
                    let data = JSON.parse(body);
                    
                    let newList : WebdisElement[] = [];
                    var arr = data.lrange;
                    
                    for (var i = 0; i < arr.length; i++) {
                        newList.push({
                            Name: arr[i],
                            URL: '/image?id=' + i
                        });
                    }
                    
                    callback(newList);
                }
            });
    }
    
    
    public getContent(listName : string, id : number, callback : IContentCallback) {
        let getUrl = this.webdisUrl + 'lindex' + '/' + listName + '/' + (id * 2 + 1) + '?type=image'
        
        request.get(
            { url: getUrl, encoding: null },
            function (error : any, response : http.IncomingMessage, body : any) {
                if (error || (response != undefined && response.statusCode != 200)) {
                    if (response != undefined) {
                        console.log("Status code: " + response.statusCode);
                        console.log("Error: " + error);
                    }
                    console.log("body: " + body);
                } else {
                    callback(body);
                }
            });
    }
}