const express = require("express");
const axios = require("axios");

const app = express();



app.get("/weather/:address", async (req, res) => {
  if (!req.params.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  const data = await axios.get(
    `http://api.weatherstack.com/current?access_key=2c313e6f7228ccfab696a2b848bb8a93&query=${req.params.address}`
  );
  const response =
    data.data.current.weather_descriptions[0] +
    ". It is currently " +
    data.data.current.temperature +
    " degress out.";
  res.send(response);
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
