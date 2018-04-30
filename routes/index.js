var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/post");

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("get home\n");
  Article.find(function(err, articles) {
    var context = {
      articles: articles
    };
    context.title = "Today";
    res.render("home", context);
  });
});
router.get("/post", function(req, res, next) {
  console.log("get posty\n");
  res.render("post", { title: "Post you blog" });
});

module.exports = router;
