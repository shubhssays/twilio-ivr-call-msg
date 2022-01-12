require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = [process.env.TWILIO_AUTH_TOKEN];
const client = require("twilio")(accountSid, authToken);

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`<h1> Welcome To Twilio IVR <h1>`);
});

app.get("/ivr/message", (req, res) => {
  console.log("message initiated...");
  client.messages
    .create({
      body: "Hi, this is a test message from twilio-ivr",
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback:
        "https://acde-202-142-118-67.ngrok.io/ivr/message/response",
      to: "+918084655995"
    })
    .then(message => console.log(message)).done();;
  res
    .status(200)
    .send("you will receive message soon...please respond accordingly");
});

app.post("/ivr/message/response", (req, res) => {
  console.log("req.body_message ==> ", req.body);
  res.status(200).send("success");
});


app.listen(process.env.PORT, process.env.HOST, function() {
  console.log(
    "Node app is listening at http://%s:%s",
    process.env.HOST,
    process.env.PORT
  );
});


/*
This page is responsible for sending normal message and listening to sent and delivered event
*/

/*

Node app is listening at http://localhost:4444
message initiated...
{
  body: 'Sent from your Twilio trial account - Hi, this is a test message from twilio-ivr',
  numSegments: '1',
  direction: 'outbound-api',
  from: '+19206333498',
  to: '+918084655995',
  dateUpdated: 2022-01-12T06:55:08.000Z,
  price: null,
  errorMessage: null,
  uri: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Messages/SM2e5a930ca057446e93da5d79e69a0750.json',
  accountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',
  numMedia: '0',
  status: 'queued',
  messagingServiceSid: null,
  sid: 'SM2e5a930ca057446e93da5d79e69a0750',
  dateSent: null,
  dateCreated: 2022-01-12T06:55:08.000Z,
  errorCode: null,
  priceUnit: 'USD',
  apiVersion: '2010-04-01',
  subresourceUris: {
    media: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Messages/SM2e5a930ca057446e93da5d79e69a0750/Media.json'
  }
}
req.body_message ==>  [Object: null prototype] {
  SmsSid: 'SM2e5a930ca057446e93da5d79e69a0750',
  SmsStatus: 'sent',
  MessageStatus: 'sent',
  To: '+918084655995',
  MessageSid: 'SM2e5a930ca057446e93da5d79e69a0750',
  AccountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',
  From: '+19206333498',
  ApiVersion: '2010-04-01'
}
req.body_message ==>  [Object: null prototype] {   
  SmsSid: 'SM2e5a930ca057446e93da5d79e69a0750',    
  SmsStatus: 'delivered',
  MessageStatus: 'delivered',
  To: '+918084655995',
  MessageSid: 'SM2e5a930ca057446e93da5d79e69a0750',
  AccountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',
  From: '+19206333498',
  ApiVersion: '2010-04-01'
}

*/