var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  Visitor: String, 
  Comment: String, 
  CreateDate: Date,
  IP: String
});
mongoose.model('Comment', Comment);
mongoose.connect('mongodb://mongo/blog');
