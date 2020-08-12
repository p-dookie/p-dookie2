//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require('multer');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const path = require('path');
const passportLocalMongoose = require("passport-local-mongoose");

const storage = multer.diskStorage({
  destination: './public/uploads/',
  fileName: function(req, file, cb) {
    cb(null, fieldname + '-' + Date.now() +
      path.extname(file.originalname));
  }
});

//init upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

//check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only")
  }
}

//init app
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

//user cookies and passport
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/p-dookieDB", {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  displayName: String,
  profile: String,
  bio: String
});


userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//Listing Schema
const tankSchema = new mongoose.Schema({
  tankName: String,
  tankBody: String,
  tankName2: String,
  tankName3: String,
  tankBody2: String,
  tankBody3: String,
  tankPrice: String,
  locale: String,
  user: String,
  userEmail: String,
  type: String,
  offer: {
    offer: String,
    user: String,
    userEmail: String
  },
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

//Listing model
const Listing = mongoose.model("Listing", tankSchema);

//constants
const tankPageTitle = "tanks!";
const ifvPageTitle = "IFVs!";
const armcarPageTitle = "armoured cars!"

const getIFV = "/ifvs/";
const getTank = "/tanks/";
const getArmcar = "/armouredcars/"

const peasantSignup = "pes";
const premiumSignup = "pre";
const millitiaSignup = "mil";


//home
app.get("/", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("profile", {
      user: req.user,
      title: "p-dookie.ca | " + req.user.displayName,
    });
  } else {
    res.render("index", {
      title: "p-dookie.ca | Home"
    });
  }
});


//All hardcoded pages
app.get("/tanks", function(req, res) {
  Listing.find({
    type: "tank"
  }, function(err, foundItems) {
    res.render("tanks", {
      tanks: foundItems,
      pageTitle: "Browse our wide selection of tanks",
      title: "p-dookie.ca | Tanks"
    });
  });
});

app.get("/ifv", function(req, res) {
  Listing.find({
    type: "ifv"
  }, function(err, foundItems) {
    res.render("tanks", {
      tanks: foundItems,
      pageTitle: "Browse our wide selection of IFV's",
      title: "p-dookie.ca | IFV's"
    });
  });
});

app.get("/armouredcars", function(req, res) {
  Listing.find({
    type: "armcar"
  }, function(err, foundItems) {
    res.render("tanks", {
      tanks: foundItems,
      pageTitle: "Browse our wide selection of Armoured Cars",
      title: "p-dookie.ca | Armoured Cars"
    });
  });
});


//individual pages
app.get("/tanks/:tankId", function(req, res) {
  const requestedTitle = req.params.tankId;
  Listing.findOne({
    _id: requestedTitle
  }, function(err, foundItem) {
    if (err) {
      console.log(err)
    } else {
      if (!foundItem) {
        res.render("failure", {
          title: "p-dookie.ca | 404"
        });
      } else {
        res.render("user-page", {
          tank: foundItem,
          title: "p-dookie.ca | "+foundItem.tankName
        });
      }
    }
  });
});

app.get("/ifvs/:ifvId", function(req, res) {
  Listing.findOne({
    _id: req.params.ifvId
  }, function(err, foundItem) {
    if (err) {
      console.log(err)
    } else {
      if (!foundItem) {
        res.render("failure", {
          title: "p-dookie.ca | 404"
        });
      } else {
        res.render("user-page", {
          tank: foundItem,
          title: "p-dookie.ca | "+foundItem.tankName
        });
      }
    }
  });
});

app.get("/armouredcars/:armcarId", function(req, res) {
  const requestedTitle = req.params.armcarId;
  Listing.findOne({
    _id: requestedTitle
  }, function(err, foundItem) {
    if (err) {
      console.log(err)
    } else {
      if (!foundItem) {
        res.render("failure", {
          title: "p-dookie.ca | 404"
        });
      } else {
        res.render("user-page", {
          tank: foundItem,
          title: "p-dookie.ca | "+foundItem.tankName
        });
      }
    }
  });
});


//Make offers
app.get("/tanks/:tankId/makeoffer", (req, res) => {
  Listing.findOne({
    _id: req.params.tankId
  }, (err, foundItem) => {
    if (err) {
      console.log(err)
    } else {
      if (!foundItem) {
        res.send("The listing you are looking for cannot be found")
      } else {
        if (req.isAuthenticated()) {
          res.render("user-page2", {
            tank: foundItem,
            title: "Make an offer on "+foundItem.tankName
          });
        } else {
          res.redirect("/signin");
        }
      }
    }
  })
});

app.get("/ifvs/:ifvId/makeoffer", (req, res) => {
  Listing.findOne({
    _id: req.params.ifvId
  }, (err, foundItem) => {
    if (err) {
      console.log(err)
    } else {
      if (!foundItem) {
        res.send("The listing you are looking for cannot be found")
      } else {
        if (req.isAuthenticated()) {
          res.render("user-page2", {
            tank: foundItem,
            title: "Make an offer on "+foundItem.tankName
          });
        } else {
          res.redirect("/signin");
        }
      }
    }
  })
});

app.get("/armouredcars/:armcarId/makeoffer", (req, res) => {
  Listing.findOne({
    _id: req.params.armcarId
  }, (err, foundItem) => {
    if (err) {
      console.log(err)
    } else {
      if (!foundItem) {
        res.send("The listing you are looking for cannot be found");
      } else {
        if (req.isAuthenticated()) {
          res.render("user-page2", {
            tank: foundItem,
            title: "Make an offer on "+foundItem.tankName
          });
        } else {
          res.redirect("/signin");
        }
      }
    }
  })
});


//Post offers
app.post("/tanks/:tankId", (req, res) => {
  Listing.findOne({
    _id: req.params.tankId
  }, (err, foundItem) => {
    if (err) {
      console.log(err);
    } else {
      if (!foundItem) {
        res.send("Sorry, an error occured, try again");
      } else {
        if (req.isAuthenticated()) {
          //send this data to the user who posted the listing
          if (req.body.amount > foundItem.offer.offer) {
            foundItem.offer = {
              offer: req.body.amount,
              user: req.user.displayName,
              userEmail: req.user.username
            };
            foundItem.save();
            res.send('Offer has been confirmed');
          } else {
            res.send('Offer has been confirmed');
          }
        } else {
          res.send("Not Authenticated");
        }
      }
    }
  });
});

app.post("/armouredcars/:armcarId", (req, res) => {
  Listing.findOne({
    _id: req.params.armcarId
  }, (err, foundItem) => {
    if (err) {
      console.log(err);
    } else {
      if (!foundItem) {
        res.send("Sorry, an error occured, try again");
      } else {
        if (req.isAuthenticated()) {
          foundItem.offer = {
            offer: req.body.amount,
            user: req.user.displayName,
            userEmail: req.user.username
          };
          //send this data to the user who posted the listing
          foundItem.save();
          res.send('Offer has been confirmed')
        } else {
          res.send("Not Authenticated");
        }
      }
    }
  });
});

app.post("/ifvs/:ifvId", (req, res) => {
  Listing.findOne({
    _id: req.params.ifvId
  }, (err, foundItem) => {
    if (err) {
      console.log(err);
    } else {
      if (!foundItem) {
        res.send("Sorry, an error occured, try again");
      } else {
        if (req.isAuthenticated()) {
          foundItem.offer = {
            offer: req.body.amount,
            user: req.user.displayName,
            userEmail: req.user.username
          };
          //send this data to the user who posted the listing
          foundItem.save();
          res.send('Offer has been confirmed')
        } else {
          res.send("Not Authenticated");
        }
      }
    }
  });
});


//Profile post viewing
app.get("/posts", (req, res) => {
  if (req.isAuthenticated()) {
    Listing.find({
      userEmail: req.user.username
    }, (err, foundItems) => {

      res.render("tanks", {
        tanks: foundItems,
        pageTitle: "View all of you're posts",
        title: req.user.displayName+"'s posts"
      });
    });
  } else {
    res.redirect("/signin");
  }
})

//post listings
app.get("/compose", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("compose", {
      title: "p-dookie.ca | Compose"
    });
  } else {
    res.redirect("/signin")
  }
});

app.post("/compose", function(req, res) {

  const type = "listing";

  if (req.isAuthenticated()) {

    if (req.body.tanks === "on") {
      const it = new Listing({
        tankName: req.body.title,
        tankBody: req.body.body,

        tankName2: req.body.secondTitle,
        tankBody2: req.body.secondBody,

        tankName3: req.body.thirdTitle,
        tankBody3: req.body.thirdBody,

        tankPrice: req.body.price,
        type: "tank",
        locale: "/tanks/",

        user: req.user.displayName,
        userEmail: req.user.username,

        offer: {
          offer: "0"
        },

        images: [
          req.body.tanksource,
          req.body.secondTanksource,
          req.body.thirdTanksource,
          req.body.fourthTanksource,
          req.body.fifthTanksource,
          req.body.sithTanksource,
        ]
      });
      it.save();
      res.redirect("/tanks");

    } else if (req.body.ifvs === "on") {

      const it = new Listing({
        tankName: req.body.title,
        tankBody: req.body.body,

        tankName2: req.body.secondTitle,
        tankBody2: req.body.secondBody,

        tankName3: req.body.thirdTitle,
        tankBody3: req.body.thirdBody,

        tankPrice: req.body.price,
        type: "ifv",
        locale: "/ifvs/",

        user: req.user.displayName,
        userEmail: req.user.username,

        offer: {
          offer: "0"
        },

        images: [
          req.body.tanksource,
          req.body.secondTanksource,
          req.body.thirdTanksource,
          req.body.fourthTanksource,
          req.body.fifthTanksource,
          req.body.sithTanksource,
        ]
      });
      it.save();
      res.redirect("/ifv");

    } else if (req.body.armcars === "on") {

      const it = new Listing({
        tankName: req.body.title,
        tankBody: req.body.body,

        tankName2: req.body.secondTitle,
        tankBody2: req.body.secondBody,

        tankName3: req.body.thirdTitle,
        tankBody3: req.body.thirdBody,

        tankPrice: req.body.price,
        type: "armcar",
        locale: "/armouredcars/",

        user: req.user.displayName,
        userEmail: req.user.username,

        offer: {
          offer: "0"
        },

        images: [
          req.body.tanksource,
          req.body.secondTanksource,
          req.body.thirdTanksource,
          req.body.fourthTanksource,
          req.body.fifthTanksource,
          req.body.sithTanksource,
        ]
      });
      it.save();
      res.redirect("/armouredcars");

    } else {
      res.send("Well fuck, error code, c0d21ce7bed8fec07491b082ef6b12b80a701528. Try changing the version to the one prior.")
    }
  } else {
    res.send("Not Authenticated");
  }
});

//Acount stuff
//Login
app.get("/signin", function(req, res) {
  res.render("signin", {
    title: "p-dookie.ca | Login"
  });
});

app.post("/signin", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err)
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/');
      });
    }
  });
});

//register
app.get("/pricing", function(req, res) {
  res.render("signup", {
    title: "p-dookie.ca | Pricing"
  });
});

app.get("/peasant", function(req, res) {
  // res.render("create-form", {
  //   createTitle: peasantSignup,
  // });
  res.redirect("/register")
});

app.get("/premium", function(req, res) {
  // res.render("create-form", {
  //   createTitle: premiumSignup,
  // });
  res.redirect("/register")
});

app.get("/millitia", function(req, res) {
  // res.render("create-form", {
  //   createTitle: millitiaSignup,
  // });
  res.redirect("/register")
});

app.get("/register", (req, res) => {
  res.render("register", {
    msg: "Upload a profile picture",
    title: "p-dookie.ca | Register"
  })
});

app.post("/register", (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      res.render("register", {
        msg: error,
        title: "p-dookie.ca | Register"
      });
    } else {
      if (req.file == undefined) {
        res.render("register", {
          msg: "Error: no file selected!",
          title: "p-dookie.ca | Register"
        });
      } else {
        User.register({
          username: req.body.username,
          displayName: req.body.displayName,
          profile: req.file.filename
        }, req.body.password, (err, user) => {
          if (err) {
            res.send("fuckieWuckie, " + err);
          } else {
            passport.authenticate("local")(req, res, function() {
              res.redirect("/")
            });
          }
        });
      }
    }
  });
});

app.get("/api", (req, res) => {
  res.render("info", {
    title: "p-dookie.ca | API",
    info: "API not currently live",
    te: "As I have just recently decided to create an API, it is not currently live. You can make requests as to what you would like to see in the API by emailing me at colm@p-dookie.ca",
    moreTe: "Thank you for you're interest, god bless you're soul"
  })
})

//logout
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use(function(req, res, next) {
  res.status(404).render("failure", {
    title: "p-dookie.ca | 404"
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
