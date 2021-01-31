require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const kafka = require("./src/services/consumer");

const app = express();
const port = 3030;

app.use(cors());

const server = http.createServer(app);
global.io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("MyWait Worker");
});

// run when client connects, send list of airport counts
io.on("connection", (socket) => {
  const airportCounts = kafka.getAllCounts();
  airportCounts.forEach((record) => {
    io.emit("airportData", record);
  });
});

// start server
server.listen(port, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`Listening at http://localhost:${port}`);
  console.log("🚀 started");
});

// start kafka on server start
kafka.run();
