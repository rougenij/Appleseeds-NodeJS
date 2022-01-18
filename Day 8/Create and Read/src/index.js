const express = require("express");
require("./db/mongoose");
const Product = require("./models/Product");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Adds new product to products list
app.post("/products", (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then(() => {
      res.status(201).send(product);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
//Gets all Products from DB
app.get("/products", (req, res) => {
  Product.find({})
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

//Gets all products that have isActive as true
app.get("/products/isActive", (req, res) => {
  Product.find({ isActive: true })
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

//Get products with a specific price range (example min = 50 max = 500)
app.get("/products/:min/:max", (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  console.log(max, min);
  Product.find({
    $and: [
      { "details.price": { $gte: min } },
      { "details.price": { $lte: max } },
    ],
  })
    .then((products) => {
      res.send(products);
    })
    .catch((e) => res.status(500).send(e));
});

//Gets a specific product by ID
app.get("/products/:id", (req, res) => {
  const _id = req.params.id;

  Product.findById(_id)
    .then((product) => {
      if (!product) {
        return res.status(404).send("No Product with this ID");
      }

      res.send(product);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
