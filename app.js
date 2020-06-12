const express = require("express");

const bodyParser = require("body-parser")

const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');



const tanks = [{
  tankName: "T-34",
  tankBody: "T-34 tank. it is in very good condition. After the second world war, this tank along with many others were shipped to north korea. It partook in a few key battles before being sold to a british man. My grandfather who passed it down to me. I am in a rough spot financially and now I need some cash some I am selling it.",
  tankSRC: "t-34.png",
  tankPrice: "$68,000 USD"
},{
  tankName: "T-14 Armata",
  tankBody: "I got this baby back in 2019 but I my wife, karen took the kids, I have no money, no car, no house. All I have is this tank. I need to sell to get something a bit more spacious, maybe an abrahams. The t-14 is a bit cramped but it's incredibally combat effective. it's fast, has a big ass gun and is great for the average sports tank driver.",
  tankSRC: "t-14.jpg",
  tankPrice: "$5, 463, 599. USD"
},{
  tankName: "Leopard 2",
  tankBody: "This vehicle was bought back in 2012, I have maintained it beautifully during the time I have had it. Starts easily every time, purs like a new bord kitten. I love this thing and I am so sad to see it go but I really don't have a choice. However I will make sure that whoever gets will take care of it eactly as I have. I feel like I am writing an obituary.",
  tankSRC: "leo-2.jpg",
  tankPrice: "$2, 382, 901. USD"
},{
  tankName: "Sherman 76mm",
  tankBody: "I bought this for my neighbors cat but as it turns out he did not like it as much as I expected. that ran from the fucking thing the moment he saw it. As you can probably imagin I am very disapointed with my neighbor. He should have taught This cat from a young age to be a competent tank comander but I guess he didn't Im selling it now, the things brand new with no problems.",
  tankSRC: "sherman.jpg",
  tankPrice: "$500, 378. USD"
}, {
  tankName: "M1A2 Abrahams",
  tankBody: "Don't get too excited, yes I know, i'm selling my abrahams. To tell you the truth I really don't have the passion anymore to maintaine such a beautiful machine. Knowing what I know today I would never let it sit to rust and die, so, I have decided to pass it on to somebody else. Over the years I have maintained the thing perfectly. There are no issues to speak of. The first to contact me can have it.",
  tankSRC: "abrahams.jpg",
  tankPrice: "$4, 112, 051. USD"
}, {
  tankName: "Centurion",
  tankBody: "It curently is just rusting and dying. I have never cared for armoured fighting vehicles. I just want to sell the thing before It loses all of it's vallue. Everything is pretty much brand new with the exception of the left sproket wich is rusted over and the engin wich needs to be replaced.",
  tankSRC: "cent.jpg",
  tankPrice: "$49,652. USD"
}
];


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/public", express.static("public"));


app.get("/", function(req, res) {
  res.render("index");
});

app.get("/tanks", function(req, res) {
  res.render("tanks.ejs", {
    tanks: tanks
  });
});


app.get("/pricing", function(req, res) {
  res.render("signup");
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

app.get("/tanks/:tankName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.tankName);

    tanks.forEach(function(tank){
    const storedTitle = _.lowerCase(tank.tankName);
    const tankBody = tank.tankBody;
    const tankSRC = tank.tankSRC;
    const tankPrice = tank.tankPrice
    if (storedTitle === requestedTitle) {
      res.render("user-page", {
        userPageTitle: storedTitle,
        userPageBody: tankBody,
        tankSRC: tankSRC,
        tankPrice: tankPrice
      });
    }
  });
});

app.post("/tanks", function(req, res) {

  console.log(req.body.button.tankName);
});

app.use(function(req, res, next) {
  res.status(404).render("failure");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
