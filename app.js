var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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

app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX -- show all campgrounds
app.get("/campgrounds", function(req, res) {
  //get all campgrounds from DB
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        campgrounds: campgrounds
      });
    }
  });
});

//CREATE  - add new campground to DB
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  //create new campground and save it to database
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
  //get data from form and add to campgrounds array
  //redirect back to campggrounds page
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //find the campgrpund with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("show", {
        campground: foundCampground
      });
    }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("YelpCampt Server Has Started!");
});
