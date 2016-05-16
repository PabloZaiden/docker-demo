"use strict";
var express = require('express');
var nconf = require('nconf');
var url = require('url');
var Webdis = require('./webdis');
var conf = nconf.env();
var router = express.Router();
var confWebdisURL = conf.get('WEBDIS_URL');
var listName = 'data';
var webdis = new Webdis.Webdis(confWebdisURL);
router.get('/image', function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var id = url_parts.query.id;
    webdis.getContent(listName, id, function (data) {
        res.send(data);
    });
});
/* GET home page. */
router.get('/', function (req, res, next) {
    webdis.get(listName, function (elements) {
        res.render('index', { title: 'Show images', images: elements });
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map