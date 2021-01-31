const router = require("express").Router();
const kafka = require("../../services/kafka/producer");

// route handlers
router.get("/", (req, res) => {
  res.status(200).send("Detectify Cloud API!").end();
});

// ingest messages into Apache Kafka
router.post("/messages", async (req, res) => {
  if (!req.body.airport || !req.body.check) {
    res.status(400).send({ response: "Missing parameter in your request!" });
    return;
  }
  const body = req.body;
  const airport = body.airport;
  const check = body.check;

  try {
    await kafka.sendMessage(airport, check); // send message to kafka cluster
  } catch (error) {
    res.end("Hi, we encountered an internal issue! Please try again later.");
    console.log("Error producing Kafka Message", error.message);
  }
  res.status(200).send({ response: "Ingesting event into pipeline!" });
});

module.exports = router;
