"use strict";
var express = require('express');
var os = require('os');
var nconf = require('nconf');
var queue_1 = require('./queue');
var conf = nconf.env();
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Load images' });
});
router.post('/', function (req, res, next) {
    var content = req.body.lines;
    var lines = content.split(os.EOL);
    lines.forEach(function (line) {
        var parts = line.trim().split(' ');
        var name = parts[0];
        var url = parts[1];
        var element = {
            "Name": name,
            "URL": url
        };
        var confQueueURL = conf.get('RESTMQ_URL');
        var queue = new queue_1.Queue(confQueueURL);
        var queueName = "myQueue";
        queue.add(queueName, element);
    });
    res.render('index', { title: 'Load images' });
});
module.exports = router;
//# sourceMappingURL=index.js.map