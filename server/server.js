const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

let drawHistory = [];
let userCount = 0;
const logPath = path.join(__dirname, "chat.log");

io.on("connection", (socket) => {
  console.log("✅ 사용자 접속");
  userCount++;
  io.emit("userCount", userCount);

  socket.emit("initDraw", drawHistory);

  socket.on("join", ({ nickname, isAdmin }) => {
    socket.nickname = nickname || "Guest";
    socket.isAdmin = isAdmin || false;
    console.log(`[JOIN] ${socket.nickname} (${socket.isAdmin ? "Admin" : "User"})`);
  });

  socket.on("draw", (data) => {
    drawHistory.push(data);
    socket.broadcast.emit("draw", data);
  });

  socket.on("chatMessage", ({ nickname, message }) => {
    const formatted = { nickname, message };
    io.emit("chatMessage", formatted);
    const logLine = `${nickname}: ${message}\\n`;
    fs.appendFileSync(logPath, logLine);
  });

  socket.on("clearCanvas", () => {
    if (socket.isAdmin) {
      drawHistory = [];
      io.emit("clearCanvas");
    }
  });

  socket.on("disconnect", () => {
    userCount--;
    io.emit("userCount", userCount);
    console.log(`[DISCONNECT] ${socket.nickname}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});
