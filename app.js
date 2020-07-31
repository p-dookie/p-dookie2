//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/p-dookieDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const tankSchema = new mongoose.Schema({
  tankName: String,
  tankBody: String,
  tankName2: String,
  tankName3: String,
  tankBody2: String,
  tankBody3: String,
  tankPrice: String,
  images: [
    String,
    String,
    String,
    String,
    String,
    String,
    String,
    String,
    String,
    String,
  ]
});


const Tank = mongoose.model("Tank", tankSchema);
const Ifv = mongoose.model("Ifv", tankSchema);
const Armcar = mongoose.model("Armcar", tankSchema);


const tankPageTitle = "tanks!";
const ifvPageTitle = "IFVs!";
const armcarPageTitle = "armoured cars!"

const getIFV = "/ifvs/";
const getTank = "/tanks/";
const getArmcar = "/armouredcars/"

const peasantSignup = "pes";
const premiumSignup = "pre";
const millitiaSignup = "mil";

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/tanks", function(req, res) {
    Tank.find({}, function(err, foundItems) {
      res.render("tanks", {
        tanks: foundItems,
        pageTitle: tankPageTitle,
        getURL: getTank
      });
    });
});

app.get("/ifv", function(req, res) {
Ifv.find({}, function(err, foundItems){
  res.render("tanks", {
    tanks: foundItems,
    pageTitle: ifvPageTitle,
    getURL: getIFV
  });
});
});

app.get("/armouredcars", function(req, res) {
Armcar.find({}, function(err, foundItems){
  res.render("tanks", {
    tanks: foundItems,
    pageTitle: armcarPageTitle,
    getURL: getArmcar
  });
});
});

app.get("/tanks/:tankId", function(req, res){
  const requestedTitle = req.params.tankId;
  Tank.findOne({_id: requestedTitle}, function(err, foundItem) {
    if(err) {
      console.log(err)
    } else {
      if(!foundItem) {
        res.render("failure");
      } else {
        res.render("user-page", {
          tank: foundItem
        });
      }
    }
  });
});

app.get("/ifvs/:ifvId", function(req, res) {
  const requestedTitle = req.params.ifvId;
  Ifv.findOne({_id: requestedTitle}, function(err, foundItem) {
    if(err) {
      console.log(err)
    } else {
      if(!foundItem) {
        res.render("failure");
      } else {
        res.render("user-page", {
          tank: foundItem
        });
      }
    }
  });
});

app.get("/armouredcars/:armcarId", function(req, res) {
  const requestedTitle = req.params.armcarId;
  Armcar.findOne({_id: requestedTitle}, function(err, foundItem) {
    if(err) {
      console.log(err)
    } else {
      if(!foundItem) {
        res.render("failure");
      } else {
        res.render("user-page", {
          tank: foundItem
        });
      }
    }
  });
});

app.get("/compose", function(req, res) {
if(req.isAuthenticated()) {
  res.render("compose");
} else {
  res.redirect("/signin")
}
});

app.post("/compose", function(req, res) {
  if(req.isAuthenticated()) {
    const it = {
      tankName: req.body.title,
      tankBody: req.body.body,

      tankName2: req.body.secondTitle,
      tankBody2: req.body.secondBody,

      tankName3: req.body.thirdTitle,
      tankBody3: req.body.thirdBody,
      tankPrice: req.body.price,
      images: [
        req.body.tanksource,
        req.body.secondTanksource,
        req.body.thirdTanksource,
        req.body.fourthTanksource,
        req.body.fifthTanksource,
        req.body.sithTanksource,
      ]
    }

    tank = new Tank(it);
    ifv = new Ifv(it);
    armcar = new Armcar(it);

    if (req.body.tanks === "on") {
      tank.save();
      res.redirect("/tanks");
      res.redirect("/tanks");
    } else if (req.body.ifvs === "on") {
      ifv.save();
      res.redirect("/ifv");
      res.redirect("/ifv");
    } else if (req.body.armcars === "on") {
      armcar.save();
      res.redirect("/armouredcars");
      res.redirect("/armouredcars");

    } else {
      res.send("Well fuck, error code, c0d21ce7bed8fec07491b082ef6b12b80a701528. Try changing the version to the one prior.")
    }
  } else {
    res.send("Not Authenticated")
  }
});

app.get("/signin", function(req, res) {
  res.render("signin");
});

app.post("/signin", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err)
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect('/');
      });
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register")
});
app.post("/register", (req, res) => {
  User.register({username: req.body.username }, req.body.password, (err, user) => {
    if(err) {
      res.send("fuckieWuckie, "  + err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/")
      });
    }
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/pricing", function(req, res) {
  res.render("signup");
});

      app.get("/peasant", function(req, res) {
        res.render("create-form", {
          createTitle: peasantSignup,
        });
      });

      app.get("/premium", function(req, res) {
        res.render("create-form", {
          createTitle: premiumSignup,
        });
      });

      app.get("/millitia", function(req, res) {
        res.render("create-form", {
          createTitle: millitiaSignup,
        });
      });

app.use(function(req, res, next) {
  res.status(404).render("failure");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
