var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var index = require("./routes/index");
var users = require("./routes/users");
var api = require("./routes/api");

var app = express();

// view engine setup
// 设置视图引擎
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
  helpers: {
    section: function(name, options) {
      if (!this._section) this._section = {};
      this._section[name] = options.fn(this);
      return null;
    }
  }
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://192.168.31.218/blog");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("open success!");
});

app.use("/", index);
app.use("/users", users);
app.use("/api", api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("common/error");
});

module.exports = app;