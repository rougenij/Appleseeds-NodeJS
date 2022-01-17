//* CRUD
//1.1
db.restaurants.find().pretty();
//1.2
db.restaurants.find({ cuisine: "asian" }).pretty();
//1.3
db.restaurants.find({ kosher: true }).pretty();
//1.4
db.restaurants.find({ "address.city": "Tel Aviv" }).pretty();
//1.5
db.restaurants.find({ "address.street": "Stam Adress 15" }).pretty();
//1.6
db.restaurants.find({ "address.cordinates": [20.46574, -40.67774] }).pretty();
//1.7
db.restaurants.find().sort({ name: 1 }).pretty();
//1.8
db.restaurants.find().sort({ "address.city": 1 }).pretty();
//1.9
db.restaurants.updateOne(
  { _id: ObjectId("61e5423e71a316ff5f596e71") },
  { $set: { name: "Reut is the best" } }
);
//1.10
db.restaurants.updateOne(
  { _id: ObjectId("61e5423e71a316ff5f596e71") },
  { $push: { reviews: { date: new Date(), score: 10 } } }
);
//1.11
db.restaurants.updateMany({ kosher: false }, { $set: { kosher: true } });
//1.12
db.restaurants.deleteOne({ _id: ObjectId("61e5423e71a316ff5f596e71") });
//1.13
db.restaurants.deleteMany({ name: { $exists: true } });
db.restaurants.deleteMany({});

//* ForEach
//2.1
db.restaurants.find().forEach(function (restaurant) {
  print("restaurant name: " + restaurant.name);
});
//2.2
db.restaurants.find().forEach((restaurant) => {
  print("restaurant name: " + restaurant.address.city);
});
//2.3
db.restaurants.find().forEach((restaurant) => {
  print("restaurant name: " + restaurant.address.coordinates);
});

//* Advanced Queries
//3.1
db.restaurants.find({ name: /^b/i });
db.restaurants.find({ name: { $regex: "^t", $options: "1" } });
//3.2
db.restaurants.find().count();
//3.3
db.restaurants.find({ "reviews.date": new Date("2020-01-01") });

//* Aggregation operations
//4.1
db.restaurants.aggregate([{ $group: { _id: "_id", $avg: "$reviews.score" } }]);
//4.2
db.restaurants.aggregate([
  {
    $project: {
      avgScore: { $avg: "$reviews.score" },
    },
  },
]);
//4.3
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
