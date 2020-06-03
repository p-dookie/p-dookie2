const express = require("express");

const bodyParser = require("body-parser")

const app = express();

const fs = require('fs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/css", express.static("css"));
app.use("/indexjs", express.static("indexjs"));
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));
app.use("/userjs", express.static("userjs"));
app.use("/sounds", express.static("sounds"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/tanks", function(req, res) {
  res.sendFile(__dirname + "/tanks.html");
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
app.post("/signin", function(req, res) {
  var one = req.body.first;
  var two = req.body.second;
  var result = "Your email is: " + one + "<br>Your password is: " + two;
  fs.readFile(__dirname + "/singedin.html", (err, data) => {
    res.send(data.toString().replace('<--!result-->', result));

  });
});
app.listen(3000, function() {
  console.log("Server started at port 3000.");
});
