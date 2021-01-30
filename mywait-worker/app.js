require("dotenv").config();
const express = require("express");
const kafka = require("./src/services/consumer");

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("MyWait Worker");
});

// start server
const server = app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`Listening at http://localhost:${port}`);
  console.log("🚀 started");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process Terminated");
  });
});

// start kafka on server start
kafka.run();