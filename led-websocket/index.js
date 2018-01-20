var http = require("http").createServer(handler);
var fs = require("fs");
var io = require("socket.io")(http);
var Gpio = require("onoff").Gpio;
var LED = new Gpio(4, "out");

http.listen(8080);

function handler(req, res) {
  fs.readFile(__dirname + "/public/index.html", function(err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 not found!");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
}

io.sockets.on("connection", function(socket) {
  var lightValue = 0;
  socket.on("light", function(data) {
    lightValue = data;
    if (lightValue !== LED.readSync()) {
      LED.writeSync(lightValue);
      console.log("GPIO Value " + lightValue);
    }
  });
});

process.on("SIGINT", function() {
  //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  process.exit(); //exit completely
});
