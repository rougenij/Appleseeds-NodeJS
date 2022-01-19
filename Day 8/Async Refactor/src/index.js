const express = require("express");
require("./db/mongoose");
const Product = require("./models/Product");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Adds new product to products list
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});
//Gets all Products from DB
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).send();
  }
});

//Gets all products that have isActive as true
app.get("/products/isActive", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.send(products);
  } catch (err) {
    res.status(500).send(e);
  }
});

//Get products with a specific price range (example min = 50 max = 500)
app.get("/products/:min/:max", async (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  try {
    const products = await Product.find({
      $and: [
        { "details.price": { $gte: min } },
        { "details.price": { $lte: max } },
      ],
    });
    if (!products) {
      return res.status(400).send("No Products within this range");
    }
    res.send(products);
  } catch (err) {
    res.status(500).send(e);
  }
});

//Gets a specific product by ID
app.get("/products/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(400).send("No Product with this ID");
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
