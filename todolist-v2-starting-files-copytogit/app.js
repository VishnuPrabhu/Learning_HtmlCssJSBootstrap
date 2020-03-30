//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://vishnuprabhu-admin:admin@cluster0-yb6wc.mongodb.net/todolistDB", {
  useNewUrlParser: true
});

const itemSchema = {
  name: String
};
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to you TODO list"
});
const item2 = new Item({
  name: "Complete 1 module in Web"
});
const item3 = new Item({
  name: "Start Flutter app and iOS course"
});
const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};
const List = mongoose.model("List", listSchema);

const workItems = [];

app.get("/", function(req, res) {
  Item.find({}, function(err, results) {
    if (results.length == 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added default item to the TODO item db");
        }
      });
      res.redirect("/");
    }
    res.render("list", {
      listTitle: "TODAY",
      newListItems: results
    });
  });
});

app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  if (listName === "TODAY") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      if (!err && foundList != null) {
        foundList.items.push(newItem);
        foundList.save();
        res.redirect("/" + listName);
      } else {
        // TODO : show error page
      }
    });
  }
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);


  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (foundList) {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      } else {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }
    } else {
      // TODO : show error page
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/delete", function(req, res) {
  const listTitle = req.body.listName;
  const itemId = req.body.checkbox;

  if (listTitle === "TODAY") {
    Item.findByIdAndRemove(itemId, function(err) {
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listTitle}, {$pull: {items: {_id: itemId}}}, function(err, foundList) {
      if (!err) {
        res.redirect("/" + listTitle);
      }
    })
  }
})

// Listen to port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started Successfully");
});
