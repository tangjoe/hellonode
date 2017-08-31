// load the http module
var http = require('http');

// configure our HTTP server
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello DevOps, Joe Tang!!!\n");
});

// listen on localhost:1080
server.listen(1080);
console.log("Server listening at http://127.0.0.1:1080/");
