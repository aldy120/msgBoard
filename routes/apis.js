// express
var express = require('express');
var router = express.Router();

// database
require('../lib/db');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');


router.post('/comment', function(req, res, next) {
  new Comment({
    Visitor: req.body.Visitor,
    Comment: req.body.Comment, 
    CreateDate: Date.now(),
    IP: req.ip
  }).save(function(err) {
    if (err) {
      console.log('Fail to save to DB');
    }
  });
  res.redirect('/users/comment');
});

router.get('/comment', function(req, res, next) {
  Comment.find({}, function(err, comment, count) {
    res.json(comment);
  });
});

router.get('/comment/delete/:id', function(req, res, next) {
  Comment.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('Fail to delete the comment');
    } else {
      console.log('done');
    }
  });
  res.redirect('/users/comment');
})

router.post('/comment/update/:id', function(req, res, next) {
  console.log('hi');
  Comment.update({_id: req.params.id}, {
    Visitor: req.body.Visitor,
    Comment: req.body.Comment
  }, function(err) {
    if (err) {
      console.log('Fail to update');
    } else {
      console.log('done');
    }
  });
  res.redirect('/users/comment');
})

module.exports = router;