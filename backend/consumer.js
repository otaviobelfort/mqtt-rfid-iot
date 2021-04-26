
const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const tags = [
    {
        title: "AABB",
        time: 6,
    },
    {
        title: "AAAA",
        time: 20,
    },
    {
        title: "ABAB",
        time: 10.0,
    },
    {
        title: "BBBB",
        time: 18.0,
    },
];

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

app.listen(3333, () => {
    console.log('🚀 Back-end started!');
});

app.get('/tags', (request, response) => {

    const { title } = request.query;
    
    const results = title
        ? tags.filter(tag => tag.title.includes(title))
        : tags;
    
    return response.json(results);
});
   
broker.on('message', (topic, message_tag) => {

    console.log(`    >>>>>>> Mensagem recebida do tópico ${topic} - tag-rfid ${message_tag}`);
    
    
    var cont_hora = message_tag;
    
    switch(cont_hora){
        case title = " A123":
            cont_hora = 10;
            const tag = {title, cont_hora};
            tag.push(tags);
    }
   // broker.write()
});

