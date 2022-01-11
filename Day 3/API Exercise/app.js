const request = require("request");
const axios = require("axios");
// const fetch = require("node-fetch");

const url = "https://api.fbi.gov/wanted/v1/list";
request({ url: url, json: true }, (error, response) => {
  console.log(response.body);
});

axios
  .get(url)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

// fetch(url).then((res) => console.log(res));
