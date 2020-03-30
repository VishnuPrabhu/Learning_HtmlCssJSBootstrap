//jshint esversion: 6
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server is running on port 3000.");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ],
    update_existing: true
  }
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us19.api.mailchimp.com/3.0/lists/b4b78963ec/",
    method: "POST",
    headers: {
      "Authorization": "apikey 851961fd7962cdcf9fbfec50857bab17-us19"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  })

})

app.post("/failure", function(req, res) {
  res.redirect("/");
})

//851961fd7962cdcf9fbfec50857bab17-us19
