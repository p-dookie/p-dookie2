const express = require("express");

const bodyParser = require("body-parser")

const app = express();

app.set('view engine', 'ejs');

const https = require("https");

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
  res.sendFile(__dirname + "/pricing.html");
});

app.get("/pager", function(req, res) {
  res.sendFile(__dirname + "/user-page.html");
});

app.get("/signin", function(req, res) {
  res.sendFile(__dirname + "/sign-in.html");
});

app.get("/ifv", function(req, res) {
  res.sendFile(__dirname + "/IFV.html");
});

app.get("/armouredcars", function(req, res) {
  res.sendFile(__dirname + "/arm-cars.html");
});

app.get("/featured", function(req, res) {
  res.sendFile(__dirname + "/featured.html");
});

app.post("/signin", function(req, res) {
  var one = req.body.first;
  var two = req.body.second;
  var result = "Your email is: " + one + "<br>Your password is: " + two;
  console.log(result);
  fs.readFile(__dirname + "/singedin.html", (err, data) => {
    res.send(data.toString().replace('<--!result-->', result));
  });
});

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + "/failure.html");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
