require('dotenv').config();

const express = require("express"),
      ejs     = require("ejs"),
      bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

let campgrounds = [
  { name : "Salmon Creek", image: "https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg"},
  { name : "Granite Hill", image: "https://pickininthepines.org/wp-content/uploads/2013/01/Campground-Tents-6.jpeg"},
  { name : "Mountain Gold", image: "https://media-cdn.tripadvisor.com/media/photo-s/09/22/fa/f5/mount-desert-campground.jpg"}
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", (req, res) => {
  let name = req.body.name,
      image = req.body.image,
      newCampground = {name: name, image: image};
  
  campgrounds.push(newCampground);

  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});



app.listen(process.env.PORT, function() {
  console.log("YelpCamp server is started!");
});