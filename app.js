const express = require("express");

const bodyParser = require("body-parser")

const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');

const tankPageTitle = "tanks!";
const ifvPageTitle = "IFVs!";
const armcarPageTitle = "armoured cars!"

const getIFV = "/ifvs/";
const getTank = "/tanks/";
const getArmcar = "/armouredcars/"


const tanks = [{
  tankName: "T-34",
  tankBody: "T-34 tank. it is in very good condition. After the second world war, this tank along with many others were shipped to north korea. It partook in a few key battles before being sold to a british man. My grandfather who passed it down to me. I am in a rough spot financially and now I need some cash some I am selling it.",
  tankSRC: "/public/images/t-34.png",
  tankPrice: "$68,000 USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}, {
  tankName: "T-14 Armata",
  tankBody: "I got this baby back in 2019 but I my wife, karen took the kids, I have no money, no car, no house. All I have is this tank. I need to sell to get something a bit more spacious, maybe an abrahams. The t-14 is a bit cramped but it's incredibally combat effective. it's fast, has a big ass gun and is great for the average sports tank driver.",
  tankSRC: "/public/images/t-14.jpg",
  tankPrice: "$5, 463, 599. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}, {
  tankName: "Leopard 2",
  tankBody: "This vehicle was bought back in 2012, I have maintained it beautifully during the time I have had it. Starts easily every time, purs like a new bord kitten. I love this thing and I am so sad to see it go but I really don't have a choice. However I will make sure that whoever gets will take care of it eactly as I have. I feel like I am writing an obituary.",
  tankSRC: "/public/images/leo-2.jpg",
  tankPrice: "$2, 382, 901. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}, {
  tankName: "Sherman 76mm",
  tankBody: "I bought this for my neighbors cat but as it turns out he did not like it as much as I expected. that ran from the fucking thing the moment he saw it. As you can probably imagin I am very disapointed with my neighbor. He should have taught This cat from a young age to be a competent tank comander but I guess he didn't Im selling it now, the things brand new with no problems.",
  tankSRC: "/public/images/sherman.jpg",
  tankPrice: "$500, 378. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}, {
  tankName: "M1A2 Abrahams",
  tankBody: "Don't get too excited, yes I know, i'm selling my abrahams. To tell you the truth I really don't have the passion anymore to maintaine such a beautiful machine. Knowing what I know today I would never let it sit to rust and die, so, I have decided to pass it on to somebody else. Over the years I have maintained the thing perfectly. There are no issues to speak of. The first to contact me can have it.",
  tankSRC: "/public/images/abrahams.jpg",
  tankPrice: "$4, 112, 051. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}, {
  tankName: "Centurion",
  tankBody: "It curently is just rusting and dying. I have never cared for armoured fighting vehicles. I just want to sell the thing before It loses all of it's vallue. Everything is pretty much brand new with the exception of the left sproket wich is rusted over and the engin wich needs to be replaced.",
  tankSRC: "/public/images/cent.jpg",
  tankPrice: "$49, 652. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}];
const ifvs = [{
  tankName: "m3 bradly",
  tankSRC: "/public/images/brad copy.jpg",
  tankPrice: "$25, 000. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
  tankBody: "Stuart litle came in the middle of the night. He killed them all. I have no one left. They are all dead. I am so sad, I hid in the laundry machine and when I woke up, this was in my backyard. It was covered in blood however there is nolonger blood on it as I cleaned it out. All functions work as they should. there is no damage and I think somebody who has the pasion to care for such a magnificent maching could really love this cherish it and call it george.",
}, {
  tankName: "No one really knows",
  tankBody: "No one knows where it came from, what it's history is or why we ended up with it. Anyways we don't want it anymore and were wondering if any of you fine people that use weaponsdealers.com would want to take it off our hands. it is in very good condition with minimal wear and tear and the engin purs like a new born kitten, it also smells good. anyways please consider my request and respond to this within the next 48 hours. good bye.",
  tankSRC: "/public/images/pol.jpg",
  tankPrice: "$50 smackeroo's",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}];
const armcars = [{
  tankName: "Fuck",
  tankBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tankSRC: "/public/images/cent.jpg",
  tankPrice: "$100. CAD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/public", express.static("public"));


app.get("/", function(req, res) {
  res.render("index");
});

app.get("/tanks", function(req, res) {
  res.render("tanks", {
    tanks: tanks,
    pageTitle: tankPageTitle,
    getURL: getTank
  });
});


app.get("/pricing", function(req, res) {
  res.render("signup");
});


app.get("/signin", function(req, res) {
  res.render("signin");
});

app.get("/ifv", function(req, res) {
  res.render("tanks", {
    tanks: ifvs,
    pageTitle: ifvPageTitle,
    getURL: getIFV
  });
});

app.get("/armouredcars", function(req, res) {
  res.render("tanks", {
    tanks: armcars,
    pageTitle: armcarPageTitle,
    getURL: getArmcar
  });
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
  tanks.forEach(function(tank) {
    const storedTitle = _.lowerCase(tank.tankName);
    const tankBody = tank.tankBody;
    const tankSRC = tank.tankSRC;
    const tankPrice = tank.tankPrice
    if (storedTitle === requestedTitle) {
      res.render("user-page", {
        userPageTitle: storedTitle,
        userPageBody: tankBody,
        tankName2: tank.tankName2,
        tankBody2: tank.tankBody2,
        tankName3: tank.tankName3,
        tankBody3: tank.tankBody3,
        tankSRC: tankSRC,
        tankSRC2: tank.tankSRC2,
        tankSRC3: tank.tankSRC3,
        tankSRC4: tank.tankSRC4,
        tankSRC5: tank.tankSRC5,
        tankSRC6: tank.tankSRC6,
        tankPrice: tankPrice,
      });
    }
  });
});

app.get("/ifvs/:ifvName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.ifvName);
  ifvs.forEach(function(ifv) {
    const storedTitle = _.lowerCase(ifv.tankName);
    const ifvBody = ifv.tankBody;
    const ifvSRC = ifv.tankSRC;
    const ifvPrice = ifv.tankPrice
    if (storedTitle === requestedTitle) {
      res.render("user-page", {
        userPageTitle: storedTitle,
        userPageBody: ifvBody,
        tankName2: ifv.tankName2,
        tankBody2: ifv.tankBody2,
        tankName3: ifv.tankName3,
        tankBody3: ifv.tankBody3,
        tankSRC: ifvSRC,
        tankSRC2: ifv.tankSRC2,
        tankSRC3: ifv.tankSRC3,
        tankSRC4: ifv.tankSRC4,
        tankSRC5: ifv.tankSRC5,
        tankSRC6: ifv.tankSRC6,
        tankPrice: ifvPrice,
      });
    }
  });
});

app.get("/armouredcars/:armcarName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.armcarName);
  armcars.forEach(function(armcar) {
    const storedTitle = _.lowerCase(armcar.tankName);
    const armcarBody = armcar.tankBody;
    const armcarSRC = armcar.tankSRC;
    const armcarPrice = armcar.tankPrice
    if (storedTitle === requestedTitle) {
      res.render("user-page", {
        userPageTitle: storedTitle,
        userPageBody: armcarBody,
        tankName2: armcar.tankName2,
        tankBody2: armcar.tankBody2,
        tankName3: armcar.tankName3,
        tankBody3: armcar.tankBody3,
        tankSRC: armcarSRC,
        tankSRC2: armcar.tankSRC2,
        tankSRC3: armcar.tankSRC3,
        tankSRC4: armcar.tankSRC4,
        tankSRC5: armcar.tankSRC5,
        tankSRC6: armcar.tankSRC6,
        tankPrice: armcarPrice,

      });
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

  const file  = req.body.tanksource;
  const file2 = req.body.secondTanksource;
  const file3 = req.body.thirdTanksource;
  const file4 = req.body.fourthTanksource;
  const file5 = req.body.fifthTanksource;
  const file6 = req.body.sithTanksource;

  const price = req.body.price;

  const oruk = req.body.tanks;
  const oik = req.body.ifvs;
  const boils = req.body.armcars;

  tank = {
    tankName: title,
    tankBody: body,

    tankName2: title2,
    tankBody2: body2,

    tankName3: title3,
    tankBody3: body3,

    tankSRC:  file,
    tankSRC2: file2,
    tankSRC3: file3,
    tankSRC4: file4,
    tankSRC5: file5,
    tankSRC6: file6,

    tankPrice: price,

  };

  if (oruk === "on") {
    tanks.push(tank);
  } else if (oik === "on") {
    ifvs.push(tank);
  } else if (boils === "on") {
    armcars.push(tank);
  } else {
    console.log("Well Fuck")
  }
  res.redirect("/tanks");
});

app.use(function(req, res, next) {
  res.status(404).render("failure");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
