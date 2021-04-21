const mqtt = require('mqtt');
var options1 = {
    port: 1883,
    host: 'mqtt://test.mosquitto.org/',
};

var options = {
    port: 1883,
    host: 'mqtt://broker.hivemq.com/',
};

var serverURL = 'mqtt://broker.mqtt-dashboard.com/';
var serverURL1 = 'mqtt://test.mosquitto.org/';
const broker = mqtt.connect(serverURL,"1883");

broker.on('connect', () => {
    broker.subscribe("tag-rfid", () => {
        console.log("tag-rfid subscribed!");
    });
  //  var temperatura = "cliente publica"
  //  broker.publish("sensor-resposta", temperatura);


});

broker.on('message', (topic, message) => {
    console.log(`    >>>>>>> Mensagem recebida do tópico ${topic} - tag-rfid ${message}º`);
   // broker.write()
});
