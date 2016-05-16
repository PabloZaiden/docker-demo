"use strict";
var request = require('request');
var WebdisElement = (function () {
    function WebdisElement() {
    }
    return WebdisElement;
}());
exports.WebdisElement = WebdisElement;
var Webdis = (function () {
    function Webdis(url) {
        if (url == null) {
            url = Webdis.defaultUrl;
        }
        this.webdisUrl = url;
    }
    Webdis.prototype.get = function (listName, callback) {
        var getUrl = this.webdisUrl + 'lrange/' + listName + '/0/-1';
        request.get(getUrl, function (error, response, body) {
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
            }
            else {
                var data = JSON.parse(body);
                var newList = [];
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
    };
    Webdis.prototype.getContent = function (listName, id, callback) {
        var getUrl = this.webdisUrl + 'lindex' + '/' + listName + '/' + (id * 2 + 1) + '?type=image';
        request.get({ url: getUrl, encoding: null }, function (error, response, body) {
            if (error || (response != undefined && response.statusCode != 200)) {
                if (response != undefined) {
                    console.log("Status code: " + response.statusCode);
                    console.log("Error: " + error);
                }
                console.log("body: " + body);
            }
            else {
                callback(body);
            }
        });
    };
    Webdis.defaultUrl = "http://localhost:7379/";
    return Webdis;
}());
exports.Webdis = Webdis;
//# sourceMappingURL=webdis.js.map