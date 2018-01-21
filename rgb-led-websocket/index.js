var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

var server = app.listen(3000);
var io = require("socket.io")(server);

io.sockets.on("connection", function(socket) {
  console.log("socket connection established");
  // Web Socket Connection
  socket.on("ledColorChange", function(data) {
    console.log(data);
  });
});
