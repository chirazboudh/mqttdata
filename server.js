/**
 *
 * This NodeJS application listens to MQTT messages and records them to MongoDB
 *
 * @author  Dennis de Greef <github@link0.net>
 * @license MIT
 *
 */
 var express = require("express");
var app = express();
var mongodb  = require('mongodb');
var mqtt     = require('mqtt');
var config   = require('./config');
var resultt;

//ar mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var mqttUri  = 'mqtt://' + config.mqtt.user + ':' + config.mqtt.password + '@' + config.mqtt.hostname + ':' + config.mqtt.port;

var client   = mqtt.connect(mqttUri);

client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
	 console.log("subscibeee");
});

var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;
mongodb.MongoClient.connect(mongoUri, function(error, database) {
    if(error != null) {
        throw error;
    }

    var collection = database.collection(config.mongodb.collection);
    collection.createIndex( { "topic" : 1 } );

    client.on('message', function (topic, message, date) {
		   
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();

var date = year + "-" + month + "-" + day;
console.log(date);
    
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
var seconds = date_ob.getSeconds();
  
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
console.log(dateTime);
        var messageObject = {
            topic: topic,
            message: message.toString(),
			date: dateTime
        };
//console.log("message"+message.toString());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
        collection.insert(messageObject, function(error, result) {
			MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mqtt");
  dbo.collection("message").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
	resultt=result;
    db.close();
  });
 
            if(error != null) {
                console.log("ERROR: " + error);
            }
        });
    });

});
app.get('/data', function(req,res) {
res.send(resultt);

});
app.listen(4000, () => {
    console.log("Server Started at ${3000}")
});
});
