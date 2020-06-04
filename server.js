const express = require("express");

const bodyParser = require("body-parser")

const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/css", express.static("css"));
app.use("/indexjs", express.static("indexjs"));
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));
app.use("/memeimgs", express.static("memeimgs"));
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
  console.log(result);
  fs.readFile(__dirname + "/singedin.html", (err, data) => {
    res.send(data.toString().replace('<--!result-->', result));
  });
});

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + "/failure.html");
})

app.listen(3000, function() {
  console.log("Server started at port 3000.");
});
