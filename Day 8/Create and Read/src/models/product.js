const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
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
module.exports = Product;
