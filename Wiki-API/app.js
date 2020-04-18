//jshint: esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchemea = {
  title: String,
  content: String
};
const Article = mongoose.model("Article", articleSchemea);


app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, results) {
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    })
  })
  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send("Article saved successfully");
      } else {
        res.send(err);
      }
    })
  })
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("successfully deleted all articles");
      } else {
        res.send(err);
      }
    });
  });

// Get a specific articles
app.route("/articles/:title")
  .get(function(req, res) {
    Article.findOne({title: req.params.title}, function(err, article) {
      if (!err) {
        res.send(article);
      } else {
        res.send("Article not found.");
      }
    });
  })
  .put(function(req,res){
    Article.update({title: req.params.title},
                   {title: req.body.title, content: req.body.content},
                   {overwrite: true},
                   function(err) {
                     if (!err) {
                       res.send("Successfully updated article.");
                     } else {
                       res.send(err);
                     }
                   });
  })
  .patch(function(req, res) {
    Article.patch({title: req.params.title}, {$set: req.body}, function(err) {
      if (!err) {
        res.send("Successfully updated article. ")
      } else {
        res.send(err);
      }
    })
  })
  .delete(function(req, res) {
    Article.deleteOne({title, req.params.title}, function(err) {
      if (!err) {
        res.send("Successfully deleted article.");
      } else {
        res.send(err);
      }
    });
  });
