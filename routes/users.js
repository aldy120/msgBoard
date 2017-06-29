var express = require('express');
var router = express.Router();

require('../lib/db');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/comment', function(req, res, next) {
  Comment.find({}, function(err, comments, count) {
    res.render('users/comment', {
      comments
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
