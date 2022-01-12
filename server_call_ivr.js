require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = [process.env.TWILIO_AUTH_TOKEN];
const client = require("twilio")(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

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

app.get("/ivr/call", (req, res) => {
  console.log("call initiated...");
  client.calls
    .create({
      twiml: "<Response><Say>Hi, this is shubham</Say></Response>",
      to: "+918084655995",
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback:
      "https://acde-202-142-118-67.ngrok.io/ivr/call/response",
    })
    .then(call => console.log(call)).done();
  res
    .status(200)
    .send("you will receive call soon...please respond accordingly");
});

app.post("/ivr/call/response", (req, res) => {
  console.log("req.body_call ==> ", req.body);
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  // Use the <Gather> verb to collect user input
  const gather = twiml.gather({ numDigits: [1, 2]});
  gather.say('For comfirmation, press 1. For cancel, press 2.');
  // If the user doesn't enter input, loop
  twiml.redirect('/ivr/call/response');
  // Render the response as XML in reply to the webhook request
  console.log("twiml xml ===> ",twiml)
  console.log("twiml xml string ===> ",twiml.toString())
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(process.env.PORT, process.env.HOST, function() {
  console.log(
    "Node app is listening at http://%s:%s",
    process.env.HOST,
    process.env.PORT
  );
});

/*
This page is responsible for sending normal call. I was unable to listen to call events like the moment when call was 
initiated and number that was pressed during the call... but was able to receive the event for the moment when call got disconnected or number pressed. Also, the call was in queue for 
a moment(may be 5-10 seconds). Then, the call was received and it did not pronounced predefined message but the
trial message automated sound.

*/


/*
key pressed: key 2

call initiated...
{
  sid: 'CAd61b4995866ac79736262a643b2c7bbc',
  dateCreated: null,
  dateUpdated: null,
  parentCallSid: null,
  accountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',    
  to: '+918084655995',
  toFormatted: '+918084655995',
  from: '+19206333498',
  fromFormatted: '(920) 633-3498',
  phoneNumberSid: 'PNe074c5d2e2f2b894ac39e27598f42f64',
  status: 'queued',
  startTime: null,
  endTime: null,
  duration: null,
  price: null,
  priceUnit: 'USD',
  direction: 'outbound-api',
  answeredBy: null,
  annotation: null,
  apiVersion: '2010-04-01',
  forwardedFrom: null,
  groupSid: null,
  callerName: null,
  queueTime: '0',
  trunkSid: null,
  uri: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/CAd61b4995866ac79736262a643b2c7bbc.json',
  subresourceUris: {
    feedback: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/CAd61b4995866ac79736262a643b2c7bbc/Feedback.json',
    notifications: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/CAd61b4995866ac79736262a643b2c7bbc/Notifications.json',
    recordings: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/CAd61b4995866ac79736262a643b2c7bbc/Recordings.json',
    payments: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/CAd61b4995866ac79736262a643b2c7bbc/Payments.json',
    siprec: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/CAd61b4995866ac79736262a643b2c7bbc/Siprec.json',
    events: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/CAd61b4995866ac79736262a643b2c7bbc/Events.json',
    feedback_summaries: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Calls/FeedbackSummary.json'
  }
}
req.body_call ==>  [Object: null prototype] {
  Called: '+918084655995',
  ToState: 'Bihar / Jharkhand',
  CallerCountry: 'US',
  Direction: 'outbound-api',
  Timestamp: 'Wed, 12 Jan 2022 07:29:46 +0000',
  CallbackSource: 'call-progress-events',
  SipResponseCode: '200',
  CallerState: 'WI',
  ToZip: '',
  SequenceNumber: '0',
  CallSid: 'CAd61b4995866ac79736262a643b2c7bbc',
  To: '+918084655995',
  CallerZip: '54937',
  ToCountry: 'IN',
  CalledZip: '',
  ApiVersion: '2010-04-01',
  CalledCity: '',
  CallStatus: 'completed',
  Duration: '1',
  From: '+19206333498',
  CallDuration: '13',
  AccountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',
  CalledCountry: 'IN',
  CallerCity: 'FOND DU LAC',
  ToCity: '',
  FromCountry: 'US',
  Caller: '+19206333498',
  FromCity: 'FOND DU LAC',
  CalledState: 'Bihar / Jharkhand',
  FromZip: '54937',
  FromState: 'WI'
}
twiml xml ===>  VoiceResponse {
  response: XMLElement {
    parent: XMLDocument {
      parent: null,
      value: null,
      children: [Array],
      baseURI: null,
      name: '#document',
      type: 9,
      documentURI: null,
      domConfig: [XMLDOMConfiguration],
      options: [Object],
      stringify: [XMLStringifier],
      rootObject: [Circular]
    },
    options: { stringify: [Object], writer: [XMLStringWriter], version: '1.0' },
    stringify: XMLStringifier {
      assertLegalChar: [Function: bound assertLegalChar],
      assertLegalName: [Function: bound assertLegalName],
      options: [Object],
      attValue: [Function: attValue]
    },
    value: null,
    children: [ [XMLElement], [XMLElement] ],
    baseURI: null,
    name: 'Response',
    type: 1,
    attribs: {},
    schemaTypeInfo: null,
    isRoot: true,
    documentObject: XMLDocument {
      parent: null,
      value: null,
      children: [Array],
      baseURI: null,
      name: '#document',
      type: 9,
      documentURI: null,
      domConfig: [XMLDOMConfiguration],
      options: [Object],
      stringify: [XMLStringifier],
      rootObject: [Circular]
    }
  },
  _propertyName: 'response'
}
twiml xml string ===>  <?xml version="1.0" encoding="UTF-8"?><Response><Gather numDigits="1 2"><Say>For comfirmation, press 1. For cancel, press 2.</Say></Gather><Redirect>/ivr/call/response</Redirect></Response>


*/