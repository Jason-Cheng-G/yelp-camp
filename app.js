var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seed the campgrounds
//seedDB();

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "once again Rusty winds cutest dog",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// Campground.create(
//   {
//     name: "Mountain Goat's Rest",
//     image:
//       "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     description:
//       "This is a huge granite hill, no bathroom or any facilities thou"
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly Created CAMPGROUND: ");
//       console.log(campground);
//     }
//   }
// );

// { "_id" : ObjectId("5c5602ab5a55c6053a3f151c"), "name" : "Salmon Creek", "image" : "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80", "__v" : 0 }
// { "_id" : ObjectId("5c560f0d6ccce205be8109df"), "name" : "Granite Hill", "image" : "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80", "__v" : 0 }
// { "_id" : ObjectId("5c560f3495643c05ce2163c5"), "name" : "Mountain Goat's Rest", "image" : "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80", "__v" : 0 }
// { "_id" : ObjectId("5c561115c1d27106556c08ec"), "name" : "Mountain Goat's Rest", "image" : "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80", "__v" : 0 }
// { "_id" : ObjectId("5c5612e3e65e9b06822e6715"), "name" : "rockey", "image" : "https://images.unsplash.com/photo-1548112571-6a5230f863fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", "__v" : 0 }

//require routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YelpCampt Server Has Started!");
});
