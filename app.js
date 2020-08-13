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

const listsSchema = new mongoose.Schema({
  listName: String,
  listBody: String,
  creator: String,
})

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
const List = mongoose.model("List", listsSchema )

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
      const it = new Listing({
        tankName: req.body.title,
        tankBody: req.body.body,

        tankName2: req.body.secondTitle,
        tankBody2: req.body.secondBody,

        tankName3: req.body.thirdTitle,
        tankBody3: req.body.thirdBody,

        tankPrice: req.body.price,
        type: req.body.where,
        locale: "/"+ req.body.where +"/",

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
      })

      it.save();
      res.redirect("/"+req.body.where);

  } else {
    res.send("Not Authenticated");
  }
});

app.get("/createlist", (req, res) => {
  if(req.isAuthenticated()) {
    res.render("createlist", {
      title: "p-dookie.ca | Create List"
    });
  } else {
    res.redirect("/signin");
  }
});

app.post("/createlist", (req, res) => {
  if(req.isAuthenticated()) {
    List.findOne({listName: req.body.name}, (err, foundItem) => {
      if(err) {
        console.log(err);
      } else {
        if(!foundItem) {
          const newList = new List({
            listName: req.body.name.toLowerCase(),
            listBody: req.body.description,
            creator: req.user.username,
          });
          newList.save();
          res.redirect("/dashboard");
        } else {
          res.send("Already there")
        }
      }
    });
  } else {
    res.redirect("/signin")
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

app.get("/dashboard", (req, res) => {
  List.find({}, (err, foundItems) => {
    if(err) {
      console.log(err);
    } else {
      res.render("dashboard", {
        title: "cool",
        lists: foundItems
      })
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

app.get("/:listType", (req, res) => {
  const listType = req.params.listType;
  List.findOne({listName: listType}, (err, foundItem) => {
    if(err) {
      console.log(err)
    } else {
      if(!foundItem) {
        res.render("failure", {
          title: "p-dookie.ca | 404"
        });
      } else {
        Listing.find({type: foundItem.listName}, (err, foundItems) => {
          res.render("tanks", {
            title: "p-dookie.ca | "+foundItem.listName,
            tanks: foundItems,
            pageTitle: "Browse our wide selection of "+foundItem.listName,
          });
        });
      }
    }
  });
});

app.get("/:listType/:tankId", (req, res) => {
  const listType = req.params.listType;
  const tankId = req.params.tankId;
  List.findOne({listName: listType}, (err, foundItem) => {
    if(err) {
      console.log(err);
    } else {
      if(!foundItem) {
        res.render("failure", {
          title: "p-dookie.ca | 404",
        });
      } else {
        Listing.findOne({_id: tankId}, (err, foundListing) => {
          if(err) {
            res.render("failure", {
              title: "p-dookie.ca | 404",
            });
          } else {
            if(foundListing.type == listType) {
              res.render("user-page", {
                title: "p-dookie.ca | " + foundListing.tankName,
                tank: foundListing,
              });
            } else {
              res.render("failure", {
                title: "p-dookie.ca | 404",
              });
            }
          }
        });
      }
    }
  });
});

app.get("/:listType/:tankId/makeoffer", (req, res) => {
  if(req.isAuthenticated()) {
    const listType = req.params.listType;
    const tankId = req.params.tankId;
    List.findOne({listName: listType}, (err, foundItem) => {
      if(err) {
        console.log(err);
      } else {
        if(!foundItem) {
          res.render("failure", {
            title: "p-dookie.ca | 404",
          });
        } else {
          Listing.findOne({_id: tankId}, (err, foundListing) => {
            if(err) {
              res.render("failure", {
                title: "p-dookie.ca | 404",
              });
            } else {
              if(foundListing.type == listType) {
                res.render("user-page2", {
                  title: "make and offer on " + foundListing.tankName,
                  tank: foundListing,
                });
              } else {
                res.render("failure", {
                  title: "p-dookie.ca | 404",
                });
              }
            }
          });
        }
      }
    });
  } else {
    res.redirect("/signin")
  }
});

app.post("/:listType/:tankId", (req, res) => {
  if(req.isAuthenticated()) {
    const listType = req.params.listType;
    const tankId = req.params.tankId;
    List.findOne({listName: listType}, (err, foundItem) => {
      if(err) {
        console.log(err);
      } else {
        if(!foundItem) {
          res.render("failure", {
            title: "p-dookie.ca | 404",
          });
        } else {
          Listing.findOne({_id: tankId}, (err, foundListing) => {
            if(err) {
              res.render("failure", {
                title: "p-dookie.ca | 404",
              });
            } else {
              if(foundListing.type == listType) {
                if(foundListing.offer.offer < req.body.amount) {
                  foundListing.offer.offer = req.body.amount;
                  foundListing.offer.user = req.user.displayName;
                  foundListing.offer.userEmail = req.user.username;
                  foundListing.save();
                  res.render("info", {
                    title: "p-dookie.ca | Offer Confirmed!",
                    info: "Offer confirmed",
                    te: "Thank you for confirming you're offer, an email was sent to the user " + foundListing.user + " including the details of the offer that was just made.",
                    moreTe: "Thank you for using our service, you have have any questions or concerns please email me at colm@p-dookie.ca"
                  });
                } else {
                  res.render("info", {
                    title: "p-dookie.ca | Offer Confirmed!",
                    info: "Offer confirmed",
                    te: "Thank you for confirming you're offer, an email was sent to the user " + foundListing.user + " including the details of the offer that was just made.",
                    moreTe: "Thank you for using our service, you have have any questions or concerns please email me at colm@p-dookie.ca"
                  });
                }
              } else {
                res.render("failure", {
                  title: "p-dookie.ca | 404",
                });
              }
            }
          });
        }
      }
    });
  } else {
    res.redirect("/signin")
  }
});

app.use(function(req, res, next) {
  res.status(404).render("failure", {
    title: "p-dookie.ca | 404"
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
