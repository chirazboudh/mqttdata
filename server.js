
 const express = require('express')

var app = express(); 
const host = '0.0.0.0';
const port = process.env.PORT || 4000;
/*var express = require("express");*/

var mongodb  = require('mongodb');
var mqtt     = require('mqtt');
var config   = require('./config');
var resultt;
var h=1;
var cnt=0;
//ar mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var mqttUri  = 'mqtt://' + config.mqtt.user + ':' + config.mqtt.password + '@' + config.mqtt.hostname + ':' + config.mqtt.port;

var client   = mqtt.connect(mqttUri);

client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
	 //console.log("subscibeee");
});

const URI = process.env.MONGODB_URL;
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://chiraz:09813432Ch.@cluster0.osmydat.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true}, function(err, db) {
        if(err) {
            console.log(err);
        }

//console.log('Connected to MongoDB!!!')
});
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async function () {

  const collection  = connection.db.collection("message");
   client.on('message', function (topic, message, date) {
		   
var date_ob = new Date();
 date_ob.toLocaleString('en-US', {
    hour12: false,
  });
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();

var date = year + "-" + month + "-" + day;
//console.log(date);
    
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();

var dateTime = year + "-" + month + "-" + day + " " +hours+ ":" + minutes;
//console.log(dateTime);
        var messageObject = {
            //topic: topic,
            message: message.toString(),
			date: dateTime
        };
   collection.insert(messageObject, function(error, result) {
  collection.find({}).toArray(function(err, data){
      //console.log(data); // it will print your collection data
  resultt=data;


});
});
});
});
app.get('/', function(req,res) {

res.send(resultt);

});


app.listen(port, host, function() {
  console.log("Server started.......");
});
