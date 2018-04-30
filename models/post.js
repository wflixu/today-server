var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  blog_title: String,
  blog_content: String,
  blog_publish_time: Date
});

var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
