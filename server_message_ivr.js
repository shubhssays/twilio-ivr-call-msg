require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = [process.env.TWILIO_AUTH_TOKEN];
const client = require("twilio")(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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
      body: "For comfirmation, press 1. For cancel, press 2.",
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
  const twiml = new MessagingResponse();

  twiml.message('For comfirmation, press 1. For cancel, press 2.');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
  console.log("twiml ===> ", twiml)
  console.log("twiml string ===> ", twiml.toString())
//   res.end(twiml.toString());
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

message initiated...
{
  body: 'Sent from your Twilio trial account - For comfirmation, press 1. For cancel, press 2.',
  numSegments: '1',
  direction: 'outbound-api',
  from: '+19206333498',
  to: '+918084655995',
  dateUpdated: 2022-01-12T08:38:49.000Z,
  price: null,
  errorMessage: null,
  uri: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Messages/SM7b9db477a5164994883878ea7b5370fa.json',
  accountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',
  numMedia: '0',
  status: 'queued',
  messagingServiceSid: null,
  sid: 'SM7b9db477a5164994883878ea7b5370fa',
  dateSent: null,
  dateCreated: 2022-01-12T08:38:49.000Z,
  errorCode: null,
  priceUnit: 'USD',
  apiVersion: '2010-04-01',
  subresourceUris: {
    media: '/2010-04-01/Accounts/AC206d66d770da7c02dc5d1893ef6c6f06/Messages/SM7b9db477a5164994883878ea7b5370fa/Media.json'
  }
}
req.body_message ==>  [Object: null prototype] {
  SmsSid: 'SM7b9db477a5164994883878ea7b5370fa',
  SmsStatus: 'sent',
  MessageStatus: 'sent',
  To: '+918084655995',
  MessageSid: 'SM7b9db477a5164994883878ea7b5370fa',
  AccountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',
  From: '+19206333498',
  ApiVersion: '2010-04-01'
}
twiml ===>  MessagingResponse {
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
    children: [ [XMLElement] ],
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
twiml string ===>  <?xml version="1.0" encoding="UTF-8"?><Response><Message>For comfirmation, press 1. For cancel, press 2.</Message></Response>     
req.body_message ==>  [Object: null prototype] {
  SmsSid: 'SM7b9db477a5164994883878ea7b5370fa',
  SmsStatus: 'delivered',
  MessageStatus: 'delivered',
  To: '+918084655995',
  MessageSid: 'SM7b9db477a5164994883878ea7b5370fa',
  AccountSid: 'AC206d66d770da7c02dc5d1893ef6c6f06',
  From: '+19206333498',
  ApiVersion: '2010-04-01'
}
twiml ===>  MessagingResponse {
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
    children: [ [XMLElement] ],
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
twiml string ===>  <?xml version="1.0" encoding="UTF-8"?><Response><Message>For comfirmation, press 1. For cancel, press 2.</Message></Response>     


*/
