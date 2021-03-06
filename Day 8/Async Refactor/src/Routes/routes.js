const express = require("express");
const router = express.Router();
const Product = require("../models/product");

//Adds new product to products list
router.post("/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});
//Gets all Products from DB
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).send();
  }
});

//Gets all products that have isActive as true
router.get("/products/isActive", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.send(products);
  } catch (err) {
    res.status(500).send(e);
  }
});

//Get products with a specific price range (example min = 50 max = 500)
router.get("/products/:min/:max", async (req, res) => {
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
router.get("/products/:id", async (req, res) => {
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

//Updates a Product
router.patch("/products/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "category",
    "isActive",
    "details.decription",
    "details.price",
    "details.discount",
    "details.imgs",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send("Invalid updates");
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(400).send("no product with this ID");
    }
    res.send(product);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Deletes a specific product
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("no Product with this ID");
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete All Products
router.delete("/products", async (req, res) => {
  try {
    const products = await Product.deleteMany({});
    if (!products || products.deletedCount === 0) {
      return res.status(400).send("No Products in shop");
    }
    res.send("All Products have been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
