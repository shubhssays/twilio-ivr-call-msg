# twilio-ivr-call-msg

This is the demo node js app for twilio call and sms ivr system. You also need to configure ngrok while running this in your local. If you are running this on cloud then you don't need to configure ngrok.
Also, It is mandatory to add webhook api to twilio console.

You will need to add below variables to env file

HOST
PORT
TWILIO_PHONE_NUMBER
TWILIO_ACCOUNT_SID

You can find 4 server file:
1. server_call.js             ::::>>> Normal call trigger
2. server_call_ivr.js         ::::>>> Normal call trigger and webhook event listener (on call ends and key press by user during call)
3. server_message.js          ::::>>> Normal message trigger
4. server_call_ivr.js         ::::>>> Normal message trigger and webhook event listener (on message sent, on message delivered and replied by user)



