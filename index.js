'use strict';
require('dotenv').config()
const token = process.env.TOKEN;
const axios = require('axios');
// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  
  handlePost(req,res);
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "NguyenNghiaHung"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

const handlePost = (req, res) => {
  let body = req.body;

  // Checks if this is an event from a page subscription
  if (body.object === "page") {
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
    // Iterates over each entry - there may be multiple if batched
    for (let { messaging } of body.entry) {
      const { sender, message, postback } = messaging[0];
      console.log("sender", sender);
      if(message) {
        const response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [{
                "title": "Do you love DevC?",
                "subtitle": "Tap a button to answer.",
                "image_url": 'https://www.techsignin.com/wp-content/uploads/2019/05/facebook-developer-circles-vietnam-innovation-challenge-22.jpg',
                "buttons": [
                  {
                    "type": "postback",
                    "title": "Yes!",
                    "payload": "yes",
                  },
                  {
                    "type": "postback",
                    "title": "No!",
                    "payload": "no",
                  }
                ],
              }]
            }
          }
        }
        axios.post(
          `https://graph.facebook.com/v8.0/me/messages?access_token=${token}`,
          {
            recipient: { id: sender.id },
            message: response,
          }
        );
      }
      if(postback) {
        handlePostback(sender, postback)
        return; 
      }
    }
  }
};

const sendMsg = (recipient, message) => {
  axios.post(
    `https://graph.facebook.com/v8.0/me/messages?access_token=${token}`,
    {
      recipient: {id: recipient},
      message: message,
    }
  );
};

const handlePostback = (sender, postback) => {
  if (postback.payload == "yes") {
    sendMsg(sender.id, { text: "thanks! devc loves you too!" });
  }
  if (postback.payload == "no") {
    sendMsg(sender.id, { text: "it's okay we can still be friends!" });
  }
};

// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));