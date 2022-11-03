var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || 'PH/82:7D:3A:20:35:FC/etph'; 
//+/devices/+/up
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || 'mqtt.livepool.eu'
config.mqtt.port      = process.env.MQTT_PORT      || 8883;
config.mqtt.user      = process.env.MQTT_USER      || 'aquatec';
config.mqtt.password  = process.env.MQTT_PASSWORD  || 'iot2021';

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || 'localhost';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'mqtt';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'message';

module.exports = config;
