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

// cors configuration whitelist for client socket connection
const whitelist = ["https://mywait.live", "https://www.mywait.live"];
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
};
global.io = socketio(server, {
  cors: corsOptions,
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
