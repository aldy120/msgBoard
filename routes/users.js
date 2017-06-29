var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

require('../lib/db');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

// helper function to send http request
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/comment', function(req, res, next) {
  res.locals.username = req.session.username;
  res.locals.logined = req.session.logined;
  var userIP = req.ip;
  Comment.find({}, function(err, comments, count) {
    res.render('users/comment', {
      comments,
      userIP
    });
  })
});
router.get('/comment/modify/:id', function(req, res, next) {
  Comment.find({_id: req.params.id}, function(err, comment, count) {
    if (comment.length === 0) {
      res.redirect('/users/comment');
    }
    res.render('users/modify',  {
      comment: comment[0]
    });
  });
});
module.exports = router;
