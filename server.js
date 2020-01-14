// StAuth10065: I Raj Patel, 000744572 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

var redis = require("redis");
var express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.urlencoded({ extended: false }));

const account = 'AC80ca523bdc4ab6b46ac33a2caca7c906';
const authToken = 'd48aaf315e018b2ec90aebfc85606776';
const clientT = require('twilio')(account, authToken);



// connection to the service using our url, password 
// change this to use your username and password
client = redis.createClient({
    url: "redis://redis-14714.c73.us-east-1-2.ec2.cloud.redislabs.com:14714",
    password: "rL6nQ4qnwNt3Kkvze7OTKIsWCClSTxsm"
});

client.on("subscribe", function (channel, count) {
    console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
});

client.subscribe("mashing");
client.subscribe("boiling");
client.subscribe("fermentation");

var messages = []

io.on('connection', function (socket) {
    socket.on('channel', function (message) {
        io.emit('channel', message);
    });
});

client.on("message", function (channel, mashingMessages) {
    console.log("Mashing Messages from channel " + channel + ": " + mashingMessages);
    mashingMessages = JSON.parse(mashingMessages)
    messages.push(mashingMessages);
    io.emit('channel', messages);
});

app.get('/', function (req, res) {
    io.emit('channel', messages);
    res.sendFile(__dirname + '/index.html')
});

// Assigning port
http.listen(3000, function () { console.log('listening on *:3000'); });