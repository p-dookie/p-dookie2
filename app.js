const express = require("express");

const bodyParser = require("body-parser")

const app = express();

const fs = require("fs");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/public", express.static("public"));


app.get("/", function(req, res) {
  res.render("index");
});

app.get("/tanks", function(req, res) {
  res.render("tanks.ejs");
});

app.get("/pricing", function(req, res) {
  res.render("signup");
});

app.get("/pager", function(req, res) {
  res.render("user-page");
});

app.get("/signin", function(req, res) {
  res.render("signin");
});

app.get("/ifv", function(req, res) {
  res.render("ifv");
});

app.get("/armouredcars", function(req, res) {
  res.render("armcars");
});


app.post("/signin", function(req, res) {
  var one = req.body.first;
  var two = req.body.second;
  res.render("reked", {
    rickSult: one,
    ronSult: two
  });
});

app.use(function(req, res, next) {
  res.status(404).render("failure");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
