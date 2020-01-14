// StAuth10065: I Raj Patel, 000744572 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
var redis = require("redis");

client = redis.createClient({
    url: "redis://redis-14714.c73.us-east-1-2.ec2.cloud.redislabs.com:14714",
    password: "rL6nQ4qnwNt3Kkvze7OTKIsWCClSTxsm"
});

function generateMessage(channelName) {
    var status = ["valid", "warning", "error"];
    var message = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var datetime = new Date().toLocaleString();

    var randomMessage = {
        status: status[Math.floor(Math.random() * 3)],
        message: message,
        datetime: datetime,
        channel: channelName
    }
    return JSON.stringify(randomMessage);
}

const interval = setInterval(function () {
    randomChannelNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomChannelNumber) {
        case 1:
            client.publish("mashing", generateMessage("mashing"));
            break;
        case 2:
            client.publish("boiling", generateMessage("boiling"));
            break;
        case 3:
            client.publish("fermentation", generateMessage("fermentation"));
            break;
        default:
            console.log("error-RandomNumber");
    }

}, 1000);

