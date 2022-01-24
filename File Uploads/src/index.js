const express = require("express");
require("./db/mongoose");
const productRouter = require("./Routes/routes");

const app = express();
const port = process.env.PORT || 3000;

//What Andrew Mead did:
//First we install mutler npm package with npm i mutler
const multer = require("multer");
// const upload = Object of multer -> dest => location where i want the files to be saved,limits object
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000, // in KBs, soo if i wanted 1mb as largest file to upload, it has to be 1 million
  },
  fileFilter(req, file, cb) {
    //* Is a method to filter what kind of data i want to get
    //* fileFilter takes 3 arguments -> request, file, cb -> callback
    //* req contains that the request has been made
    //https://www.npmjs.com/package/multer
    //* file contains information about the file that been uploaded
    //* we use cb to tell the filter that we are done filtering the file

    // cb(new Error('File must be PDF')) -> if something goes wrong, thats how we pass an error
    // cb(undefined, true) -> We set first argument as undefined, and second one boolean as true to say everything has been sent correctly
    // cb(undefined , false) -> That we should not use

    //! One way of filtering a file -> endsWith is to check what file ends with
    if (!file.originalname.endsWith(".pdf")) {
      return cb(new Error("Please upload a PDF"));
    }
    cb(undefined, true);

    // Another way to do it is with Regex
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please Upload only a Word Document"));
    }
    cb(undefined, true);
  },
});

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
  // /upload is the endpoint
  // upload.single('upload') -> the 'upload' changes according to what holds multer --> Look  line 12 const upload = multer({})
});

//! Handling Express Erros, Also need to learn more about Middleware functions in Express
app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//!Adding User Avatar for exmaple
app.post(
  "/users/me/avatar",
  auth,
  upload.single("upload"),
  (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//! Serving up files
app.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err) {
    res.status(400).send();
  }
});

//! NPM module SHARP to resize and shape image
// npm i sharp
const sharp = require("sharp");
app.post(
  "/users/me/avatar",
  auth,
  upload.single("upload"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .reszie({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
