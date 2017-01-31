var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var CommentSchema = new mongoose.Schema({
  userName: String,
  text: String
});

var UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
  session: String,
  lastLocation: String,
  playlists: Array
});

module.exports = {
  Comment: mongoose.model('Comment', CommentSchema),
  User: mongoose.model('User', UserSchema)
};