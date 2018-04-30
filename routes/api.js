var express = require("express");
var router = express.Router();
const Article = require("../models/post");

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("get home\n");
  res.render("home", { title: "Today" });
});
router.post("/blog", function(req, res, next) {
  console.log("post blog\n");
  console.log(req.body);
  var article = new Article({
    blog_title: req.body.post_title,
    blog_content: req.body.post_content,
    blog_publish_time: new Date()
  });
  article.save();
  res.redirect("/");
});

module.exports = router;
