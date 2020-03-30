//jshint esversion:6
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitDB",  { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry. No name is specified."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const apple = new Fruit({
//   name: "Apple",
//   rating: 9,
//   review: "Pretty Solid as a fruit"
// });
// apple.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);

// const newEmployee = new Person({
//   name: "John",
//   age: 37
// });
// newEmployee.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "Kiwis are awesome"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 8,
//   review: "I like oragne very much"
// });
//
// const banana = new Fruit({
//   name: "Bana na",
//   rating: 10,
//   review: "It is the most healthy fruit"
// });

// Fruit.insertMany([kiwi, orange, banana], function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Successfully saved all the fruits to the FruitsDb");
//   }
// });
//
// Fruit.updateOne({name: "Kiwi"}, {rating: 8.5}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Updated document Successfully");
//   }
// });


const fruit = new Fruit({
  name: "Mandarin Orange",
  rating: 10,
  review: "Mandarin orange are very sweet and sour"
});
fruit.save();
const amy = new Person({
  name: "Amy",
  age: "15",
  favoriteFruit: fruit
});
amy.save();



// Person.insertMany([amy], function(error, docs) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(docs);
//   }
// });



Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();

    fruits.forEach(function(fruit) {
     console.log(fruit.name);
    });
  }
});
