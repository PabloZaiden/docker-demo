import express = require('express');
import os = require('os');
import request = require('request');
import nconf = require('nconf');

import { Queue } from './queue';

let conf = nconf.env();
let router = express.Router();

/* GET home page. */
router.get('/', function(req : express.Request, res : express.Response, next : Function) {
  res.render('index', { title: 'Load images' });
});

router.post('/', function (req : express.Request, res : express.Response, next : Function) {
  let content : string = req.body.lines 
  let lines = content.split(os.EOL);
  
  lines.forEach(function (line) {
    let parts = line.trim().split(' ');
    let name = parts[0];
    let url = parts[1];
    
    let element = {
      "Name": name,
      "URL": url 
    };

    let confQueueURL = conf.get('RESTMQ_URL');

    let queue = new Queue(confQueueURL);
    let queueName = "myQueue";
    
    queue.add(queueName, element);
  });

  res.render('index', { title: 'Load images'});
});

module.exports = router;
