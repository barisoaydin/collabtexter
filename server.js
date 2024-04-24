import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:4000"
  }
});

const server = io.listen(4000);

server.on("connection", function(socket) {
  console.log("user connected");
  socket.emit("welcome", "welcome man");
});