#include <ESP8266WiFi.h> 
#include <PubSubClient.h>
//#include <queue.h>

#define pinBotao1 12  //D6

//WiFi
const char* SSID = "****";                // SSID / nome da rede WiFi que deseja se conectar
const char* PASSWORD = "******";   // Senha da rede WiFi que deseja se conectar
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "broker.mqtt-dashboard.com"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883;                      // Porta do Broker MQTT

#define ID_MQTT  "MQTTSD23"            //Informe um ID unico e seu. Caso sejam usados IDs repetidos a ultima conexão irá sobrepor a anterior. 
#define TOPIC_PUBLISH "temp-sd"    //Informe um Tópico único. Caso sejam usados tópicos em duplicidade, o último irá eliminar o anterior.
PubSubClient MQTT(wifiClient);        // Instancia o Cliente MQTT passando o objeto espClient

//Declaração das Funções
void mantemConexoes();  //Garante que as conexoes com WiFi e MQTT Broker se mantenham ativas
void conectaWiFi();     //Faz conexão com WiFi
void conectaMQTT();     //Faz conexão com Broker MQTT
void enviaPacote();     //

void setup() {
  pinMode(pinBotao1, INPUT_PULLUP);         

  Serial.begin(115200);

  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);   
}

void loop() {
  mantemConexoes();
  enviaValores();
  MQTT.loop();
}

void mantemConexoes() {
    if (!MQTT.connected()) {
       conectaMQTT(); 
    }
    
    conectaWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}

void conectaWiFi() {

  if (WiFi.status() == WL_CONNECTED) {
     return;
  }
        
  Serial.print("Conectando-se na rede: ");
  Serial.print(SSID);
  Serial.println("  Aguarde!");

  WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI  
  while (WiFi.status() != WL_CONNECTED) {
      delay(100);
      Serial.print(".");
  }
  
  Serial.println();
  Serial.print("Conectado com sucesso, na rede: ");
  Serial.print(SSID);  
  Serial.print("  IP obtido: ");
  Serial.println(WiFi.localIP()); 
}

void conectaMQTT() { 
    while (!MQTT.connected()) {
        Serial.print("Conectando ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) {
            Serial.println("Conectado ao Broker com sucesso!");
        } 
        else {
            Serial.println("Noo foi possivel se conectar ao broker.");
            Serial.println("Nova tentatica de conexao em 10s");
            delay(10000);
        }
    }
}

void enviaValores() {

  //Botao Apertado     
        MQTT.publish(TOPIC_PUBLISH, "1");
        Serial.println("Botao1 APERTADO. Payload enviado.");
  delay(2000);
  //Botao Solto
        MQTT.publish(TOPIC_PUBLISH, "0");
        Serial.println("Botao1 SOLTO. Payload enviado.");
    
}



