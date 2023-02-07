import http from "node:http";
import express from "express";

import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(new URL("index.html", import.meta.url).pathname);
});

app.get("/script.js", (req, res) => {
  res.sendFile(new URL("script.js", import.meta.url).pathname);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit('chat message', msg)
  });
});

server.listen(3000, () => {
  console.log("Listening on *:3000");
});
