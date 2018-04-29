var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("get home\n");
  res.render("home", { title: "Today" });
});

module.exports = router;
