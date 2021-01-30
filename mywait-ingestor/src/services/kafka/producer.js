const { Kafka } = require("kafkajs");
const kafkaConfig = require("./config");
const moment = require("moment");

/**
 * Receive checkin message to kafka cluster
 * @param  {Object} message
 */
const sendMessage = async (airport, check) => {
  try {
    // initialize kafka with configuration
    const kafka = new Kafka(kafkaConfig.config);
    const producer = kafka.producer();

    await producer.connect();

    // create check in/out record
    const currentTime = moment();
    const kafkaMessage = {airport: airport, checked: check, date: currentTime};

    await producer.send({
      topic: kafkaConfig.topic,
      messages: [{ value: JSON.stringify(kafkaMessage) }],
    });

    console.log(`Check${check} from ${airport} recorded at ${moment()}`);
    await producer.disconnect();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
