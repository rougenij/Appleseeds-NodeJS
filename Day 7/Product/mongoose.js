const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/product-db", {
  // useNewUrlParser: true,
  // useCreateIndex: true
});

const Shop = mongoose.model("Shop", {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  details: {
    description: {
      type: String,
      required: true,
      min: [10, "10 is minimun"],
      validate(value) {
        if (value < 10) {
          throw new Error(
            "Descripition of product must be greater than 10 words!"
          );
        }
      },
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("Must be a positive number");
        }
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
    imgs: {
      type: Array,
      minItems: 2,
      validate(value) {
        if (value < 2) {
          throw new Error("Product must have 2 images");
        }
      },
    },
  },
});

const product = new Shop({
  name: "Stam Product",
  category: "Appleseeds Bootcamp",
  isActive: true,
  details: {
    description:
      "This is a Fullstack bootcamp, oohh nooo, its soo intensive but you learn so much from it",
    price: 500,
    imgs: [1, 2],
  },
});

product
  .save()
  .then((product) => {
    console.log(product);
  })
  .catch((error) => {
    console.log(error);
  });
