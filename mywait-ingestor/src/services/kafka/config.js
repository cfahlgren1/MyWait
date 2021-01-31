const topic = process.env.KAFKA_TOPIC;

const config = {
  brokers: [
    process.env.KAFKA_BROKER_1,
    process.env.KAFKA_BROKER_2,
    process.env.KAFKA_BROKER_3,
  ],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
};

module.exports = { config, topic };
