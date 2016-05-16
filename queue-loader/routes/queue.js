"use strict";
var request = require('request');
var Queue = (function () {
    function Queue(url) {
        this.defaultUrl = "http://localhost:8888/";
        if (url == null) {
            url = this.defaultUrl;
        }
        this.queueUrl = url;
    }
    Queue.prototype.add = function (queueName, obj) {
        var postURL = this.queueUrl + "q/" + queueName;
        var content = new Buffer(JSON.stringify(obj), 'utf8').toString('base64');
        request.post({
            url: postURL,
            form: { value: content }
        }, function (error, response, body) {
            if (error || (response != undefined && response.statusCode != 200)) {
                if (response != undefined) {
                    console.log("Status code: " + response.statusCode);
                    console.log("Error: " + error);
                }
                console.log("body: " + body);
            }
        });
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map