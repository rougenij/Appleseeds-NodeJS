const mongoose = require("mongoose");

const PictureUpload = mongoose.model("PictureUpload", {
  buffer: {
    type: Buffer,
    required: true,
  },
});
module.exports = PictureUpload;
