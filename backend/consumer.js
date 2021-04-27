
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

var tags = [
    {   
        tag: "E010591B",
        nome: "Otávio Belfor",
        input: "",
        output: "", 
        totalHoras: 0, 
        data_str:""
    },
    {tag: "9AD2A839", nome: "José Vitor", input: "", output:"", totalHoras: 0, data_str:""},
    {tag: "C123", nome: "Rodrigo Silva", input: "", output:"", totalHoras: 0, data_str:""},
    {tag: "D123", nome: "Mario Gorge", input: "", output:"", totalHoras: 0, data_str:""},
];

app.listen(3333, () => {
    console.log('🚀 Back-end started!');
});

app.get('/tags', (request, response) => {

    const {nome} = request.query;
    
    const results = nome
        ? tags.filter(tag => tag.nome.includes(nome))
        : tags;
    
    return response.json(results);
});

broker.on('message', (topic, message_tag) => {


    //var message_tag = "A123";
    console.log(`    >>>>>>> Mensagem recebida do tópico ${topic} - tag-rfid ${message_tag}`);
    
    var cont=0;
    //var cont_hora = message_tag;
   // message_tag = "A123";

   var a = message_tag.toString();
   var b = tags[0].tag.toString();

   //a.substring
    switch(message_tag.toString()){
       // console.log("BEM VENDO AOS SISPRO - BOM DIA 1" + message_tag );

        case tags[0].tag.toString():
            console.log("BEM VENDO AOS SISPRO - BOM DIA");
            if(cont == 0){
                var atual = new Date();
                var str_data = atual.toString();
                
                tags[0].input = str_data.substring(0,str_data.indexOf(":") + 6);
                //tags[0].totalHoras = 0;
                tags[0].data_str = atual;

                //console.log("BEM VENDO AOS SISPRO - BOM DIA");
                console.log(" 		NOME		|	HORARIO DE ENTRADA	|	HORARIO DE SAIDA		| 	HORAS TRABALHADAS		|" + "\n" + 
                "|       "  + tags[0].nome + "            |         " + tags[0].input + "      |          " + tags[0].output + "      |         " + tags[0].totalHoras + "      |");

                //message_tag = "0";
                cont++;
                console.log("cont: 1>  " + cont);
            }
            if(cont == 1){
                var atual = new Date();
                var str_data = atual.toString();
                var data_passad = tags[0].input.toString();
                
                tags[0].output = str_data.substring(0,str_data.indexOf(":") + 6);
                console.log("cont: 0>  " + cont);
                //tags[0].output = atual

                //tags[0].totalHoras = (str_data.substring(str_data.indexOf(":") - 2, str_data.indexOf(":"))  - (data_passad.substring(data_passad.indexOf(":") - 2, data_passad.indexOf(":"))) );
                //tags[4].totalHoras = 14-10;
                //tags[0].totalHoras = (((atual - new Date(tags[0].data_str)) % (60*1000))/1000).toString() ;
                tags[0].totalHoras = (((atual - new Date(tags[0].data_str)) % ((1000* 60)*60*24)) / ((1000* 60)*60));

                cont = 0;
                atual.toDateString()  
            }
            //break;
            case tags[1].tag.toString():
                console.log("BEM VENDO AOS SISPRO - BOM DIA");
                if(cont == 0){
                    var atual = new Date();
                    var str_data = atual.toString();
                    
                    tags[1].input = str_data.substring(0,str_data.indexOf(":") + 6);
                    //tags[0].totalHoras = 0;
                    tags[1].data_str = atual;
    
                    //console.log("BEM VENDO AOS SISPRO - BOM DIA");
                    console.log(" 		NOME		|	HORA DE ENTRADA	|	HORA DE SAIDA		| 	HORAS TRABALHADAS		|" + "\n" + 
                    "|       "  + tags[1].nome + "      |         " + tags[1].input + "      |          " + tags[1].output + "      |         " + tags[1].totalHoras + "      |");
    
                    //message_tag = "0";
                    cont++;
                    console.log("cont: 1>  " + cont);
                }
                if(cont == 1){
                    var atual = new Date();
                    var str_data = atual.toString();
                    var data_passad = tags[1].input.toString();
                    
                    tags[1].output = str_data.substring(0,str_data.indexOf(":") + 6);
                    console.log("cont: 0>  " + cont);
                    //tags[0].output = atual
    
                    //tags[0].totalHoras = (str_data.substring(str_data.indexOf(":") - 2, str_data.indexOf(":"))  - (data_passad.substring(data_passad.indexOf(":") - 2, data_passad.indexOf(":"))) );
                    //tags[4].totalHoras = 14-10;
                    //tags[0].totalHoras = (((atual - new Date(tags[0].data_str)) % (60*1000))/1000).toString() ;
                    tags[1].totalHoras = (((atual - new Date(tags[1].data_str)) % ((1000* 60)*60*24)) / ((1000* 60)*60));
    
                    cont = 0;
                    atual.toDateString()  
                }
        
        default:
            console.log("");
        
        //case message_tag == tags[0-3].nome

    }


    /*
    switch(cont_hora){
        case nome = " A123":
            cont_hora = 10;
            const tag = {nome, cont_hora};
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
var fim = new Date('06/02/2019 18:00:00');

var diferenca = fim - atual;
var dias = Math.floor(diferenca / _dia);
var horas = Math.floor((diferenca % _dia) / _hora);
var minutos = Math.floor((diferenca % _hora) / _minuto);
var segundos = Math.floor((diferenca % _minuto) / _segundo);
for(var i = 1; i < 100000000;i++){

}
//console.log(tags[].nome);
console.log(atual + "atual");
console.log(fim + "fim");
console.log((diferenca/_dia)/365 + "s");





    leitor.question("Input Tag: \n", function(answer) {
        var message_tag = answer;
        console.log("\nSua resposta '" + message_tag + "' foi gravada com sucesso numa variável");
        
//var message_tag = "A123";
        //console.log(`    >>>>>>> Mensagem recebida do tópico ${topic} - tag-rfid ${message_tag}`);
        
        var cont=0;
        var cont_hora = message_tag;
       // message_tag = "A123";
        switch(message_tag){
            case tags[0].tag:
                tags[0].input = "10:00:00";
                tags[3].totalHoras = 0;
                console.log("BEM VENDO AOS SISPRO - BOM DIA");
                console.log(tags[0]);
                message_tag = "0";
                cont +=1;
                if(cont == 2){
                    tags[0].output = "14:00:00";
                    tags[0].totalHoras = 14-10;
                    cont = 0;
                    
                }
                leitor.question();
                //break;
            default:
                console.log(" Default");
                break;
            
            //case message_tag == tags[0-3].nome
    
        }
        //leitor.close();
    });
*/
