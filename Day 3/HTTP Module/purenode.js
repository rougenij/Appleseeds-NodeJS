// Import the HTTP module
const http = require("http");
// Import the URL module
const url = require("url");

// Make our HTTP server
const server = http.createServer((req, res) => {
  // Parse the request url
  const reqUrl = url.parse(req.url).pathname;
  if (reqUrl == "/") {
    res.write("<h1>Ayy welcome to my pure node website</h1>");
    res.end();
  } else if (reqUrl == "/users") {
    res.write("Just imagine that there is a users JSON file here");
    res.end();
  } else if (reqUrl == "/raw-html”") {
    res.write("<h1>Welcome</h1>");
    res.end();
  }
});
// Have the server listen on port 8080
server.listen(8080);
