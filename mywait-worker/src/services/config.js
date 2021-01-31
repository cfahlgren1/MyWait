const topic = process.env.KAFKA_TOPIC;

const config = {
  brokers: [
    process.env.KAFKA_BROKER_1,
    process.env.KAFKA_BROKER_2,
    process.env.KAFKA_BROKER_3,
  ],
};

module.exports = { config, topic };
