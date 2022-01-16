const path = require("path");
const express = require("express");
const cors = require("cors");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

app.use(express.json());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "client/build");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/weather", (req, res) => {
  // console.log(req.body);
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      console.log("im here", latitude, longitude, location);
      if (error) {
        return res.status(400).send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.status(400).send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`port running at ${PORT}`);
});
