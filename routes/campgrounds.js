var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX -- show all campgrounds
router.get("/", function(req, res) {
  console.log(req.user);
  //get all campgrounds from DB
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  });
});

//CREATE  - add new campground to DB
router.post("/", function(req, res) {
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
router.get("/new", function(req, res) {
  res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
  //find the campgrpund with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render show template with that campground
        res.render("campgrounds/show", {
          campground: foundCampground
        });
      }
    });
});

module.exports = router;
