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
      minLength: [10, "10 is minimun"],
      validate(value) {
        if (value.length < 10) {
          throw new Error(
            "Descripition of product must be greater than 10 words!"
          );
        }
      },
    },
    price: {
      type: Number,
      required: true,
      // min: 0
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
      // type:[String] -> The way to accept an array of String only
      minItems: 2,
      validate(value) {
        if (value.length < 2) {
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
const blancos = new Shop({
  name: "Blancos",
  category: "Best Group",
  isActive: true,
  details: {
    description: "The Best group in this bootcamp",
    price: 10000000000000000,
    imgs: [1, 2],
  },
});
const timmy = new Shop({
  name: "Timmy",
  category: "South Park",
  isActive: true,
  details: {
    description:
      "Pini's second account.. Everything is for Timmy, better not kill him",
    price: 1000,
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

blancos
  .save()
  .then((product) => {
    console.log(product);
  })
  .catch((error) => {
    console.log(error);
  });

timmy
  .save()
  .then((product) => {
    console.log(product);
  })
  .catch((error) => {
    console.log(error);
  });
