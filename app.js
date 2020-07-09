const express = require("express");

const mongoose = require('mongoose')

const bodyParser = require("body-parser")

const shortid = require("shortid")

const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/p-dookieDB", {
  useNewUrlParser: true
});

const tankSchema = new mongoose.Schema({
  tankName: String,
  tankBody: String,
  tankName2: String,
  tankName3: String,
  tankBody2: String,
  tankBody3: String,
  tankPrice: String,
  images: {
    tankSRC1: String,
    tankSRC2: String,
    tankSRC3: String,
    tankSRC4: String,
    tankSRC5: String,
    tankSRC6: String,
  }
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

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/public", express.static("public"));

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
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const title = req.body.title;
  const body = req.body.body;

  const title2 = req.body.secondTitle
  const body2 = req.body.secondBody;

  const title3 = req.body.thirdTitle;
  const body3 = req.body.thirdBody;

  const file = req.body.tanksource;
  const file2 = req.body.secondTanksource;
  const file3 = req.body.thirdTanksource;
  const file4 = req.body.fourthTanksource;
  const file5 = req.body.fifthTanksource;
  const file6 = req.body.sithTanksource;

  const price = req.body.price;

  const oruk = req.body.tanks;
  const oik = req.body.ifvs;
  const boils = req.body.armcars;

  tank = new Tank({
    tankName: title,
    tankBody: body,

    tankName2: title2,
    tankBody2: body2,

    tankName3: title3,
    tankBody3: body3,
    tankPrice: price,
    images: {
      tankSRC1: file,
      tankSRC2: file2,
      tankSRC3: file3,
      tankSRC4: file4,
      tankSRC5: file5,
      tankSRC6: file6,
    }
  });
  ifv = new Ifv({
    tankName: title,
    tankBody: body,

    tankName2: title2,
    tankBody2: body2,

    tankName3: title3,
    tankBody3: body3,
    tankPrice: price,
    images: {
      tankSRC1: file,
      tankSRC2: file2,
      tankSRC3: file3,
      tankSRC4: file4,
      tankSRC5: file5,
      tankSRC6: file6,
    }
  });
  armcar = new Armcar({
    tankName: title,
    tankBody: body,

    tankName2: title2,
    tankBody2: body2,

    tankName3: title3,
    tankBody3: body3,
    tankPrice: price,
    images: {
      tankSRC1: file,
      tankSRC2: file2,
      tankSRC3: file3,
      tankSRC4: file4,
      tankSRC5: file5,
      tankSRC6: file6,
    }
  });
  if (oruk === "on") {
    tank.save();
    res.redirect("/tanks");
    res.redirect("/tanks");
  } else if (oik === "on") {
    ifv.save();
    res.redirect("/ifv");
    res.redirect("/ifv");
  } else if (boils === "on") {
    armcar.save();
    res.redirect("/armouredcars");
    res.redirect("/armouredcars");

  } else {
    res.send("Well fuck, error code, c0d21ce7bed8fec07491b082ef6b12b80a701528. Try changing the version to the one prior.")
  }
});

app.get("/signin", function(req, res) {
  res.render("signin");
});

app.post("/signin", function(req, res) {
  var one = req.body.first;
  var two = req.body.second;
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
