var express = require('express');
var os = require('os');
var router = express.Router();
var request = require('request');
var conf = require('nconf').env();
var url = require('url');

var webdisURL = 'http://localhost:7379/';  
var confWebdisURL = conf.get('WEBDIS_URL');
var listName = 'data';
  
if (confWebdisURL != null) {
  webdisURL = confWebdisURL
}

router.get('/image', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var id = url_parts.query.id;

  var getUrl = webdisURL + 'lindex' + '/' + listName + '/' + (id * 2 + 1) + '?type=image'
  
  request.get({ url: getUrl, encoding: null },
    function (error, response, body) {
      if (error || (response != undefined && response.statusCode != 200)) {
          if (response != undefined) {
            console.log("Status code: " + response.statusCode);
            console.log("Error: " + error);
          }
          console.log("body: " + body);
      } else {
        res.send(body);
      }
    }
  )

});

/* GET home page. */
router.get('/', function(req, res, next) {
  var getUrl = webdisURL + 'lrange/' + listName + '/0/-1';
  
  request.get(
    getUrl,
    function (error, response, body) {
      if (error || (response != undefined && response.statusCode != 200)) {
          if (response != undefined) {
            console.log("Status code: " + response.statusCode);
            console.log("Error: " + error);
          }
          console.log("body: " + body);
      } else {
        var data = JSON.parse(body);
        
        var newList = [];
        var arr = data.lrange;
        
        for (var i = 0; i < arr.length; i++) {
          newList.push({
            Name: arr[i],
            URL: '/image?id=' + i
          });
        }
        
        res.render('index', { title: 'Show images', images: newList });
      }
    }
  );
});

module.exports = router;
