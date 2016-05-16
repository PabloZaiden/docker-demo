var express = require('express');
var os = require('os');
var router = express.Router();
var request = require('request');
var conf = require('nconf').env();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Load images' });
});

router.post('/', function (req, res, next) {
  var content = req.body.lines
  var lines = content.split(os.EOL);
  
  lines.forEach(function (line) {
    var parts = line.trim().split(' ');
    var name = parts[0];
    var url = parts[1];
    
    var element = {
      "Name": name,
      "URL": url 
    };
    
    var queueURL = "http://localhost:8888/";
    var confQueueURL = conf.get('RESTMQ_URL');
  
    if (confQueueURL != null) {
      queueURL = confQueueURL
    }
    
    var queueName = "myQueue";
    var postURL = queueURL + "q/" + queueName;
    var content = new Buffer(JSON.stringify(element), 'utf8').toString('base64');
    
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
  });

  res.render('index', { title: 'Load images'});
});

module.exports = router;
