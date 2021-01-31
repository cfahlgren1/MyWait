const { Kafka } = require("kafkajs");
const kafkaConfig = require("./config");
const moment = require("moment");
const slugify = require("slugify");

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
    const words = slugify(airport).toLowerCase().split("-"); // create slug for airport
    const slug = `${words[0]}-${words[1]}`;
    const kafkaMessage = {
      airport: airport,
      slug: slug,
      checked: check,
      date: currentTime,
    };

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
