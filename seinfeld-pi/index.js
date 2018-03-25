var express = require("express");
var app = express();
var path = require("path");

motionSensorIn = new Gpio(4, "in", "both");

app.use(express.static(path.join(__dirname, "public")));

var server = app.listen(8000);
var io = require("socket.io")(server);

motionSensorIn.watch(function(err, value) {
  if (err) {
    throw err;
  }
  console.log(value);
});

io.sockets.on("connection", function(socket) {
  console.log("Socket connection established");
});

process.on("SIGINT", function() {
  motionSensorIn.unexport();
});
