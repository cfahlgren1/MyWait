const axios = require("axios");

var start = new Date();
let count = 0;

/*
  Simulate customers getting through TSA checkout
*/
const usersCheckoutLoop = () => {
  setTimeout(() => {
    checkOut();

    // Again
    usersCheckoutLoop();

    // Every 10ms
  }, 4000);
};

/*
 Checkout a user from the airport by sending API request
 to AWS Lamdba Function
*/
const checkOut = () => {
  axios.post(
    "https://5kynk8jkk6.execute-api.us-east-1.amazonaws.com/api/messages",
    {
      airport: "Boston International Airport",
      check: "out",
    }
  );
};

usersCheckoutLoop();
