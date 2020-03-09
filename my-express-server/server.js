//jshint esversion:6

const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hello World");
})

app.get("/contact", function(req, res) {
  res.send("You can contact me at Vishnu@gmail.com");
});

app.get("/about", function(req, res) {
  res.send("My name is Vishnu and I love to learn and code...");
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
