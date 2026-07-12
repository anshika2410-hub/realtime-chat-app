const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());

// Socket io ko request me available karana
app.use((req, res, next) => {
  req.io = io;
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Message Routes 👇 (Ye line add karni hai)
app.use("/api/messages", require("./routes/messageRoutes"));
const onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("🟢 User Connected");

  socket.on("join", (username) => {
    onlineUsers.set(socket.id, username);

    io.emit("onlineUsers", [...onlineUsers.values()]);
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  socket.on("logout", () => {
    onlineUsers.delete(socket.id);

    io.emit("onlineUsers", [...onlineUsers.values()]);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);

    io.emit("onlineUsers", [...onlineUsers.values()]);

    console.log("🔴 User Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});