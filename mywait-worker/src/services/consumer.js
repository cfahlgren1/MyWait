const { Kafka } = require("kafkajs");
const kafkaConfig = require("./config");
const kafka = new Kafka(kafkaConfig.config);
const topic = kafkaConfig.topic;
const consumer = kafka.consumer({ groupId: "mywait-workers" }); // set consumer to a group

const airports = {};

// connect and subscribe to topic
const run = async () => {
  console.log("Connecting to Kafka");
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });
  console.log("Subscribed to", topic);
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const checkRecord = JSON.parse(message.value);

      // get attributes from checkin message
      const checked = checkRecord.checked;
      const airport = checkRecord.airport;
      const date = checkRecord.date;
      const slug = checkRecord.slug;

      // create airport if it doesn't exist
      if (!airports[slug]) {
        airports[slug] = checkRecord;
        airports[slug].count = 0;
      }

      // process check in/out
      if (checked === "in") {
        airports[slug].count = airports[slug].count += 1;
      } else if (checked === "out" && airports[slug].count > 0) {
        airports[slug].count = airports[slug].count -= 1;
      }

      checkRecord.count = airports[slug].count;
      console.log(`Received check${checked} from ${airport} at ${date}`);
      io.emit("airportData", { message: JSON.stringify(checkRecord) });
    },
  });
};

const getAllCounts = () => {
  const all_counts = [];
  Object.keys(airports).forEach((airport) => {
    all_counts.push({
      message: JSON.stringify(airports[airport]),
    });
  });

  return all_counts;
};

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.map((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.map((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});

module.exports = { run, getAllCounts };
