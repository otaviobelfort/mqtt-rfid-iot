
const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


var readline = require('readline');
var resp = "";

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


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

var bd = [
    {tag: "A123", nome: "Otávio Belfor", input: "", output: "", totalHoras: 0, data_str:""},
    {tag: "B123", nome: "José Vitor", input: "", output:"", totalHoras: 0, data_str:""},
    {tag: "C123", nome: "Rodrigo Silva", input: "", output:"", totalHoras: 0, data_str:""},
    {tag: "D123", nome: "Mario Gorge", input: "", output:"", totalHoras: 0, data_str:""},
];

broker.on('message', (topic, message_tag) => {



    //var message_tag = "A123";
    console.log(`    >>>>>>> Mensagem recebida do tópico ${topic} - tag-rfid ${message_tag}`);
    
    var cont=0;
    //var cont_hora = message_tag;
   // message_tag = "A123";

   var a = message_tag.toString();
   var b = bd[0].tag.toString();

   //a.substring
    switch(message_tag.toString()){
       // console.log("BEM VENDO AOS SISPRO - BOM DIA 1" + message_tag );

        case bd[0].tag.toString():
            console.log("BEM VENDO AOS SISPRO - BOM DIA");
            if(cont == 0){
                var atual = new Date();
                var str_data = atual.toString();
                
                bd[0].input = str_data.substring(0,str_data.indexOf(":") + 6);
                //bd[0].totalHoras = 0;
                bd[0].data_str = atual;

                //console.log("BEM VENDO AOS SISPRO - BOM DIA");
                console.log(bd[0]);
                //message_tag = "0";
                cont++;
                console.log("cont: 1>  " + cont);
            }
            if(cont == 1){
                var atual = new Date();
                var str_data = atual.toString();
                var data_passad = bd[0].input.toString();
                
                bd[0].output = str_data.substring(0,str_data.indexOf(":") + 6);
                console.log("cont: 0>  " + cont);
                //bd[0].output = atual

                //bd[0].totalHoras = (str_data.substring(str_data.indexOf(":") - 2, str_data.indexOf(":"))  - (data_passad.substring(data_passad.indexOf(":") - 2, data_passad.indexOf(":"))) );
                //bd[4].totalHoras = 14-10;
                //bd[0].totalHoras = (((atual - new Date(bd[0].data_str)) % (60*1000))/1000).toString() ;
                bd[0].totalHoras = (((atual - new Date(bd[0].data_str)) % ((1000* 60)*60*24)) / ((1000* 60)*60));

                cont = 0;
                atual.toDateString()  
            }
            //break;
        
        default:
            console.log(" ---------- | --------- > " + a == b );
        
        //case message_tag == bd[0-3].nome

    }


    /*
    switch(cont_hora){
        case title = " A123":
            cont_hora = 10;
            const tag = {title, cont_hora};
            tag.push(tags);
    }
    */
   // broker.write()
});


/* 

var _segundo = 1000;
var _minuto = _segundo * 60;
var _hora = _minuto * 60;
var _dia = _hora * 24;

var atual = new Date();
var fim = new Date('06/02/2017 18:00:00');

var diferenca = fim - atual;

var dias = Math.floor(diferenca / _dia);
var horas = Math.floor((diferenca % _dia) / _hora);
var minutos = Math.floor((diferenca % _hora) / _minuto);
var segundos = Math.floor((diferenca % _minuto) / _segundo);

for(var i = 1; i < 100000000;i++){

}

//console.log(bd[].nome);
console.log(atual + "atual");
console.log(fim + "fim");
console.log((diferenca/_dia)/365 + "s");





    leitor.question("Qual módulo pra ler dados no node.js?\n", function(answer) {
        var message_tag = answer;
        console.log("\nSua resposta '" + message_tag + "' foi grava com sucesso numa variável inútil");
        
//var message_tag = "A123";
        //console.log(`    >>>>>>> Mensagem recebida do tópico ${topic} - tag-rfid ${message_tag}`);
        
        var cont=0;
        var cont_hora = message_tag;
       // message_tag = "A123";
        switch(message_tag){
            case bd[0].tag:
                bd[0].input = "10:00:00";
                bd[3].totalHoras = 0;
                console.log("BEM VENDO AOS SISPRO - BOM DIA");
                console.log(bd[0]);
                message_tag = "0";
                cont +=1;
                if(cont == 2){
                    bd[0].output = "14:00:00";
                    bd[0].totalHoras = 14-10;
                    cont = 0;
                    
                }
                leitor.question();
                //break;
            default:
                console.log(" Default");
                break;
            
            //case message_tag == bd[0-3].nome
    
        }
        //leitor.close();
    });
*/
