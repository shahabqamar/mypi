var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

var server = app.listen(8000);
var io = require("socket.io")(server);

var Gpio = require("pigpio").Gpio,
  ledRed = new Gpio(4, { mode: Gpio.OUTPUT }),
  ledGreen = new Gpio(17, { mode: Gpio.OUTPUT }),
  ledBlue = new Gpio(27, { mode: Gpio.OUTPUT }),
  redRGB = 0,
  greenRGB = 0,
  blueRGB = 0;

//RESET RGB LED
ledRed.digitalWrite(0);
ledGreen.digitalWrite(0);
ledBlue.digitalWrite(0);

io.sockets.on("connection", function(socket) {
  console.log("Socket connection established");
  socket.on("ledColorChange", function(data) {
    //for common cathode RGB LED 0 is fully off, and 255 is fully on
    redRGB = parseInt(data[0]);
    greenRGB = parseInt(data[1]);
    blueRGB = parseInt(data[2]);

    ledRed.pwmWrite(redRGB);
    ledGreen.pwmWrite(greenRGB);
    ledBlue.pwmWrite(blueRGB);
    console.log(data);
  });
});

process.on("SIGINT", function() {
  //on ctrl+c
  ledRed.digitalWrite(0);
  ledGreen.digitalWrite(0);
  ledBlue.digitalWrite(0);
  process.exit();
});
