//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request  = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var amount = req.body.amount;
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var options = {
    url: "",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>"+ amount + crypto + " is currently worth " + price + fiat + "</h1>");

    res.send();
  })
});
