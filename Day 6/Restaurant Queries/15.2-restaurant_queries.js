//* CRUD
// 1.1 - Write a MongoDb query to display all the documents in the restaurant collection.
db.restaurants.find().pretty();
//1.2 - Write a MongoDb query to display all restaurants that have a specific cuisine
db.restaurants.find({ cuisine: "asian" }).pretty();
//1.3 - Write a MongoDb query that displays only koshere restaurants
db.restaurants.find({ kosher: true }).pretty();
//1.4 - Write a MongoDb query that displays only a specific cities restaurants
db.restaurants.find({ "address.city": "Tel Aviv" }).pretty();
//1.5 - Write a MongoDb query to display a specific restaurants address
db.restaurants.find({ "address.street": "Stam Adress 15" }).pretty();
//1.6 - Write a MongoDb query to display a specific restaurants coordinates
db.restaurants.find({ "address.cordinates": [20.46574, -40.67774] }).pretty();
//1.7 - Write a MongoDb query that should display all restaurants in ascending order by restaurant name.
db.restaurants.find().sort({ name: 1 }).pretty();
//1.8 - Write a MongoDb query that should display all restaurants in ascending order by city names.
db.restaurants.find().sort({ "address.city": 1 }).pretty();
//1.9 - Update a specific restaurant's name
db.restaurants.updateOne(
  { _id: ObjectId("61e5423e71a316ff5f596e71") },
  { $set: { name: "Reut's Restaurant" } }
);
//1.10 - Update a specific restaurant by adding a new review.
db.restaurants.updateOne(
  { _id: ObjectId("61e5423e71a316ff5f596e71") },
  { $push: { reviews: { date: new Date(), score: 10 } } }
);
//1.11 - Update all restaurants to be kosher
db.restaurants.updateMany({ kosher: false }, { $set: { kosher: true } });
//1.12 -  Delete a specific restaurant
db.restaurants.deleteOne({ _id: ObjectId("61e5423e71a316ff5f596e71") });
//1.13 -  Delete all restaurants
db.restaurants.deleteMany({ name: { $exists: true } });
db.restaurants.deleteMany({});

//* ForEach
//2.1 - Write a MongoDb query to print all restaurant names
db.restaurants.find().forEach(function (restaurant) {
  print("restaurant name: " + restaurant.name);
});
//2.2 - Write a MongoDb query to print all restaurant cities
db.restaurants.find().forEach((restaurant) => {
  print("restaurant name: " + restaurant.address.city);
});
//2.3 - Write a MongoDb query to print all restaurant coordinates
db.restaurants.find().forEach((restaurant) => {
  print("restaurant name: " + restaurant.address.coordinates);
});

//* Advanced Queries
//3.1 - Query for restaurant names that start with a specific alphabet
db.restaurants.find({ name: /^b/i });
db.restaurants.find({ name: { $regex: "^t", $options: "1" } });
//3.2 - Query how many documents you have from the restaurant collection.
db.restaurants.find().count();
//3.3 - Write a MongoDb query to get restaurants that include reviews from a specific date.
db.restaurants.find({ "reviews.date": new Date("2020-01-01") });

//* Aggregation operations
//4.1 Write a mongoDb query to display all restaurants average score.
db.restaurants.aggregate([
  {
    $project: {
      avgScore: { $avg: "$reviews.score" },
    },
  },
]);
//4.2 - Write a mongoDb query to display a specific restaurant average score
db.restaurants.aggregate([
  { $unwind: "$reviews" },
  { $match: { _id: ObjectId("61e5423e71a316ff5f596e71") } },
  {
    $group: {
      _id: "$name",
      avgRating: { $avg: "$reviews.score" },
    },
  },
]);
