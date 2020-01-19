require('dotenv').config()
var write = require('./../../writefile')
const tmi = require('tmi.js');
var fs = require('fs');
var utils = require('./../../utils')
var moment = require('moment')
const colorxjs = require('colorxjs')

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

//open botwords for inspirational and random
//open botsays for welcoming users to chat
//open botsay1 to send an individual msg

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

var messagesFile = 'coloringa'
// Called every time a message comes in

function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  var messages = require('./../chat/'+messagesFile+'.json')
  var username = context['username']
  var userid = context['user-id']
  var unix = context['tmi-sent-ts'].substr(0, context['tmi-sent-ts'].length-3)

  var formatted = moment.unix(context['tmi-sent-ts']).format('L');

  messages.push([{message: msg, user: username, timestamp: unix, userid: userid}])

}

var nouns = require('./nouns.json')

randomQuote();
function randomQuote(){
    
        let random = utils.getRandom(0, nouns.length-1);
        // console.log(random)
        colorxjs(3000,nouns.length).subscribe(tempo=>{
            var randomWhat = utils.getRandom(0, 2)
   
          let randomInspiration = utils.getRandom(0, nouns.length-1)
          let word_en = nouns[randomInspiration]['word_en']
            let word_pt = nouns[randomInspiration]['word_pt']
            client.say('#coloringa','"'+word_pt+'" em Inglês é: "'+word_en+'"')
        })
    

    
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
