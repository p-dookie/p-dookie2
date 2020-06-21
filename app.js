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
  tankPrice: "$68,000 USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/images/t-34.png",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}
}, {
  tankName: "T-14 Armata",
  tankBody: "I got this baby back in 2019 but I my wife, karen took the kids, I have no money, no car, no house. All I have is this tank. I need to sell to get something a bit more spacious, maybe an abrahams. The t-14 is a bit cramped but it's incredibally combat effective. it's fast, has a big ass gun and is great for the average sports tank driver.",
  tankPrice: "$5, 463, 599. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/images/t-14.jpg",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}
}, {
  tankName: "Leopard 2",
  tankBody: "This vehicle was bought back in 2012, I have maintained it beautifully during the time I have had it. Starts easily every time, purs like a new bord kitten. I love this thing and I am so sad to see it go but I really don't have a choice. However I will make sure that whoever gets will take care of it eactly as I have. I feel like I am writing an obituary.",
  tankPrice: "$2, 382, 901. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/images/leo-2.jpg",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}
}, {
  tankName: "Sherman 76mm",
  tankBody: "I bought this for my neighbors cat but as it turns out he did not like it as much as I expected. that ran from the fucking thing the moment he saw it. As you can probably imagin I am very disapointed with my neighbor. He should have taught This cat from a young age to be a competent tank comander but I guess he didn't Im selling it now, the things brand new with no problems.",
  tankPrice: "$500, 378. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/images/sherman.jpg",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}
}, {
  tankName: "M1A2 Abrahams",
  tankBody: "Don't get too excited, yes I know, i'm selling my abrahams. To tell you the truth I really don't have the passion anymore to maintaine such a beautiful machine. Knowing what I know today I would never let it sit to rust and die, so, I have decided to pass it on to somebody else. Over the years I have maintained the thing perfectly. There are no issues to speak of. The first to contact me can have it.",
  tankPrice: "$4, 112, 051. USD",
  tankName2: 'This one think he big and bad',
  tankBody2: 'On the morning of november 1st 2019, the governer general of the province of Alberta agreed that he though that "this one think he big and bad", to quote his words, and all the staff here at crenulose encorporated agree as well. It is undeniable. He really does think he "Big and bad". that is absolutely not to say. In the 2015 apocalypse this vehicle killed 16 orphines after fireing a H.E.A.T shell into a public pre-school. 16 children were killed and 27 were wounded. The comander of this vehicle was able to succesfully obtain the last of the insulin from the fried corpse of little timmy who was diabetic. He then brought it back to his master who was able to live another day. unfortunately He was killed later that day by his brother who disagreed with him about how to proceed with the plan.',
  tankName3: "The adventures of Johny Star, the commander",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/bain/img1.jpg",
  tankSRC2: "/public/bain/img2.jpg",
  tankSRC3: "/public/bain/img3.jpg",
  tankSRC4: "/public/bain/img4.jpg",
  tankSRC5: "/public/bain/img5.jpg",
  tankSRC6: "/public/bain/img6.jpg",
}
}, {
  tankName: "Centurion",
  tankBody: "It curently is just rusting and dying. I have never cared for armoured fighting vehicles. I just want to sell the thing before It loses all of it's vallue. Everything is pretty much brand new with the exception of the left sproket wich is rusted over and the engin wich needs to be replaced.",
  tankPrice: "$49, 652. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/images/cent.jpg",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}
}];
const ifvs = [{
  tankName: "m3 bradley",
  tankBody: "He fucking got them, he got them all. Oh shit I have nothing left. He killed my whole family I have run out of time. Please oh please send help please. I don't wanna die. It't little stuart, he came in the midle of the ngiht, me and my brothers have been running since noon yesterday. I am terrified. They already got johny. We are in the middle of the forest. I don't know how much longer we can go on. I can hear the rumble of their engines we are going to need to leave soon there is no doubt about it.",
  tankPrice: "$25, 000. USD",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/images/brad copy.jpg",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
  tankBody: "Stuart litle came in the middle of the night. He killed them all. I have no one left. They are all dead. I am so sad, I hid in the laundry machine and when I woke up, this was in my backyard. It was covered in blood however there is nolonger blood on it as I cleaned it out. All functions work as they should. there is no damage and I think somebody who has the pasion to care for such a magnificent maching could really love this cherish it and call it george.",
}
}, {
  tankName: "No one really knows",
  tankBody: "No one knows where it came from, what it's history is or why we ended up with it. Anyways we don't want it anymore and were wondering if any of you fine people that use weaponsdealers.com would want to take it off our hands. it is in very good condition with minimal wear and tear and the engin purs like a new born kitten, it also smells good. anyways please consider my request and respond to this within the next 48 hours. good bye.",
  tankPrice: "$50 smackeroo's",
  tankName2: "BrokenTest",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "BrokenTest3",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "/public/images/pol.jpg",
  tankSRC2: "https://cdn.hswstatic.com/gif/m1-tank-9.jpg",
  tankSRC3: "https://nationalinterest.org/sites/default/files/main_images/1593px-M4_Sherman_Tank_..._%2842613957591%29.jpg",
  tankSRC4: "https://www.wallpaperup.com/uploads/wallpapers/2013/12/11/192513/72feb1a9b57e21da265012882384cd99-700.jpg",
  tankSRC5: "https://assets.newatlas.com/dims4/default/7b3b3bc/2147483647/strip/true/crop/1619x1079+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fblack-night-1.jpeg",
  tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbUggRBmuAIIbxx7V0uC56ZGSLLDh-1Eg24s6UaGY1lJ3Y1mMZ&usqp=CAU",
}
}];
const armcars = [{
  tankName: "Cougar",
  tankBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tankPrice: "$89, 660. USD",
  tankName2: "Great Value",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  tankName3: "Versatile weapons assortement",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Fames ac turpis egestas sed tempus. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum dolor sit amet. Mattis pellentesque id nibh tortor id aliquet lectus. Vitae auctor eu augue ut lectus arcu bibendum. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. In hac habitasse platea dictumst quisque sagittis purus. Nam libero justo laoreet sit. Congue quisque egestas diam in arcu cursus euismod quis viverra.",
  images: {
  tankSRC1: "https://www.military-today.com/apc/patria_amv_xp.jpg",
  tankSRC2: "https://pbs.twimg.com/media/CtTCnObWgAA5N82.jpg",
  tankSRC3: "https://www.army-technology.com/wp-content/uploads/sites/3/2017/09/patria1.jpg",
  tankSRC4: "https://www.defencetalk.com/wp-content/uploads/2014/06/patria-XP-armored-vehicle.jpg",
  tankSRC5: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Patria_AMV_Karlovac_2009_8.jpg",
  tankSRC6: "https://i.pinimg.com/originals/fb/b0/f2/fbb0f217622c0a98757291e13a120a9c.jpg",
}
},{
  tankName: "Humvee",
  tankBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tankPrice: "$23, 500. USD",
  tankName2: "Trusted by Millions",
  tankBody2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat. Ipsum dolor sit amet consectetur adipiscing. Lectus nulla at volutpat diam ut. Purus sit amet volutpat consequat. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Non arcu risus quis varius quam quisque id. Volutpat consequat mauris nunc congue. Enim nec dui nunc mattis. At tellus at urna condimentum. Adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est. Id cursus metus aliquam eleifend.",
  tankName3: "Well maintained",
  tankBody3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate enim nulla aliquet porttitor lacus luctus. Eget mi proin sed libero. Vitae proin sagittis nisl rhoncus mattis. Quam vulputate dignissim suspendisse in est ante. Semper auctor neque vitae tempus quam pellentesque. Id leo in vitae turpis. Vel pretium lectus quam id leo in vitae. Sit amet porttitor eget dolor morbi non arcu risus quis. Dis parturient montes nascetur ridiculus mus. Ullamcorper a lacus vestibulum sed arcu non odio. Vitae et leo duis ut diam quam nulla. At urna condimentum mattis pellentesque id nibh tortor. Quis auctor elit sed vulputate. Et malesuada fames ac turpis. Ipsum a arcu cursus vitae congue mauris rhoncus. Augue eget arcu dictum varius duis.",
  images: {
    tankSRC1: "https://militarymachine.com/wp-content/uploads/2016/11/hmmwv-humvee-03-ts600.jpg",
    tankSRC2: "https://upload.wikimedia.org/wikipedia/commons/7/72/Iraqi_Humvees.jpg",
    tankSRC3: "https://pbs.twimg.com/media/CGWM9rcUgAA8lGO.png",
    tankSRC4: "https://sites.breakingmedia.com/uploads/sites/3/2012/01/humveeiraq.jpg",
    tankSRC5: "https://media4.s-nbcnews.com/j/msnbc/Components/Photos/041210/041210_humvee2_hmed_3p.grid-6x2.jpg",
    tankSRC6: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1CgeImfQr_7dBqqBRomAxY560I_Qm6Qq4CJGAyZK9HJdv3LW0&usqp=CAU",
  }
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
    const tankSRC = tank.tankSRC1;
    const tankPrice = tank.tankPrice
    if (storedTitle === requestedTitle) {
      res.render("user-page", {
        tank:tank,
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
        tank:ifv,
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
      tank:armcar,
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
    tankPrice: price,

    images: {
    tankSRC1:  file,
    tankSRC2: file2,
    tankSRC3: file3,
    tankSRC4: file4,
    tankSRC5: file5,
    tankSRC6: file6,
}
  };

  if (oruk === "on") {
    tanks.push(tank);
    res.redirect("/tanks");
  } else if (oik === "on") {
    ifvs.push(tank);
    res.redirect("/ifvs");
  } else if (boils === "on") {
    armcars.push(tank);
    res.redirect("/armouredcars")
  } else {
    res.send("Well fuck, error code, c0d21ce7bed8fec07491b082ef6b12b80a701528. Try changing the version to the one prior.")
  }
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.use(function(req, res, next) {
  res.status(404).render("failure");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000.");
});
