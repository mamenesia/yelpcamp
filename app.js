require('dotenv').config();

const express     = require("express"),
      ejs         = require("ejs"),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      Campground  = require('./models/campground');
      Comment     = require('./models/comment'),
      User        = require('./models/user'),
      seedDB      = require('./seed');


// seedDB();
const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  // Get all campground from DB
  Campground.find({}, (err, allCampgrounds) => {
    if(err) {
      console.log(err)
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
  
});

app.post("/campgrounds", (req, res) => {
  let name = req.body.name,
      image = req.body.image,
      desc = req.body.description,
      newCampground = {name: name, image: image, description: desc};
  
  Campground.create(newCampground, (err, campground) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// COMMENTS ROUTE

app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
    } else {

      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) {
          console.log(err)
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  });
});

// APP LISTENING
app.listen(process.env.PORT, function() {
  console.log("YelpCamp server is started!");
});