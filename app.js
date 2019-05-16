require('dotenv').config();

const express     = require("express"),
      ejs         = require("ejs"),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose");

const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  // Get all campground from DB
  Campground.find({}, (err, allCampgrounds) => {
    if(err) {
      console.log(err)
    } else {
      res.render("index", {campgrounds: allCampgrounds});
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
  res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});



app.listen(process.env.PORT, function() {
  console.log("YelpCamp server is started!");
});