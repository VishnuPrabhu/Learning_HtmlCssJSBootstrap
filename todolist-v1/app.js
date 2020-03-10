//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = [];
const workItems = [];

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("list", {listTitle: day, listOfItems:  items});
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  let page = req.body.list;

  if(page === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  let viewParams = {
    listTitle: "Work",
    listOfItems: workItems
  }
  res.render("list", viewParams);
});

app.get("/about", function(req, res) {
  res.render("about");
})
