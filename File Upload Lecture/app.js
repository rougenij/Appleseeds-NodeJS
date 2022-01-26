const express = require("express");
const multer = require("multer");
require("./src/db/mongoose");
const cors = require("cors");
const sharp = require("sharp");
const PicUpload = require("./src/model/pictureModel");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({
  limits: {
    fileSize: 1000000, // in 1000000 Bytes -> 1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // First one of setting File Type to upload
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

//! Upload a single file
app.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .toBuffer();
    const pic = await new PicUpload({ buffer });
    pic.save();
    res.send(pic);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//! Upload Multiple Files
app.post(
  "/uploadmultiple",
  upload.array("uploadfiles", 10),
  async (req, res) => {
    req.files.forEach(async (file) => {
      const buffer = await sharp(file.buffer)
        .resize({ width: 250, height: 250 })
        .toBuffer();
      const pic = await new PicUpload({ buffer });
      pic.save();
    });
    res.send("All Files have been uploaded");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
