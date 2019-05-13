require('dotenv').config();

const express = require("express"),
      ejs     = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});




app.listen(process.env.PORT, function() {
  console.log("YelpCamp server is started!");
});