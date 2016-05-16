import express = require('express');
import os = require('os');
import request = require('request');
import nconf = require('nconf')
import url = require('url');

import Webdis = require('./webdis');

let conf = nconf.env();
let router = express.Router();

let confWebdisURL = conf.get('WEBDIS_URL');
let listName = 'data';

let webdis = new Webdis.Webdis(confWebdisURL);
  
router.get('/image', function(req, res, next) {
  let url_parts = url.parse(req.url, true);
  let id : number = url_parts.query.id;

  webdis.getContent(listName, id, function (data) {
    res.send(data);
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  
  webdis.get(listName, function (elements) {
     res.render('index', { title: 'Show images', images: elements });
  });
});

module.exports = router;
