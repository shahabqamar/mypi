var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var path = require("path");

// Define the port to run on
app.set("port", 3000);

app.use(express.static(path.join(__dirname, "public")));

// Listen for requests
app.listen(app.get("port"), function() {
  console.log("Ready");
});

// io.sockets.on("connection", function(socket) {
//   // Web Socket Connection
//   socket.on("rgbLed", function(data) {
//     console.log(data);
//   });
// });
