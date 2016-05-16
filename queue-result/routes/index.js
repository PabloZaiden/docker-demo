var express = require('express');
var os = require('os');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var list = [
    {Name: 'banana', URL: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Bananas_white_background_DS.jpg'},
    {Name: 'banana', URL: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Bananas_white_background_DS.jpg'}
  ];
  
  var webdisURL = 'http://localhost:7379/';
  var listName = 'data';
  var getUrl = webdisURL + 'lrange/' + listName + '/0/-1';
  
  request.get(
    getUrl,
    function (error, response, body) {
      if (error || response.statusCode != 200) {
        console.log("Status code: " + response.statusCode);
        console.log("Error: " + error);
        console.log(body);
      } else {
        var data = JSON.parse(body);
        
        var newList = [];
        var arr = data.lrange;
        
        for (var i = 0; i < arr.length; i++) {
          newList.push({
            Name: arr[i],
            URL: webdisURL + 'lindex' + '/' + listName + '/' + (i * 2 + 1) + '?type=image'
          });
        }
        
        res.render('index', { title: 'Show images', images: newList });
      }
    }
  )
});

/*
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
    var queueName = "myQueue";
    var postURL = queueURL + "q/" + queueName;
    var content = new Buffer(JSON.stringify(element), 'utf8').toString('base64');
    
    request.post({
        url: postURL,
        form: {value: content} 
      },
      function (error, response, body) {
        if (error || response.statusCode != 200) {
          console.log("Status code: " + response.statusCode);
          console.log("Error: " + error);
          console.log(body);
        } 
      });
  });

  res.render('index', { title: 'Load images'});
});
*/
module.exports = router;
