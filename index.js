const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const url = require('url');
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4201",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

});


io.sockets.on('connection', function (socket) {

  console.log("User Connected");

  socket.on("coordinates", function (data) {

    console.log("Lat : " + data.lat + ", Long : " + data.lng);

  });

  socket.emit("hello", "world");

  socket.on("gshops", function (data) {
    if (Array.isArray(data)) {

      data.forEach(obj => {
        console.log("Gshopping Url : " + obj);
      })
    }
    else {
      console.log("Gshopping Url : " + data);
    }

  });

  socket.on("disconnect", function () {

    console.log("User Disconnected");
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});