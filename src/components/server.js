const express  = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(5173);

app.use(express.static('public'));

const io = socket(server);

io.on("connection", (socket) => {
  console.log("Socket connection established", socket.id);

  socket.on('new user', (userName) => {
    socket.broadcast.emit('new user', userName);
  });
});