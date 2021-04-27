#include <ESP8266WiFi.h> 
#include <PubSubClient.h>
#include <SPI.h> // Only needed for Arduino 1.6.5 and earlier
#include <MFRC522.h>

#define pinBotao1 12  //D6
#define SS_PIN D2
#define RST_PIN D1

//WiFi
const char* SSID = "OBS";                // SSID / nome da rede WiFi que deseja se conectar
const char* PASSWORD = "otaviobelfort";   // Senha da rede WiFi que deseja se conectar
const char* tag_str = "";

//_____________________________
// objetos
MFRC522 mfrc522(SS_PIN, RST_PIN);
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "broker.mqtt-dashboard.com"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883;                      // Porta do Broker MQTT

#define ID_MQTT  "MQTTSD23"            //Informe um ID unico e seu. Caso sejam usados IDs repetidos a ultima conexão irá sobrepor a anterior. 
#define TOPIC_PUBLISH "tag-rfid"    //Informe um Tópico único. Caso sejam usados tópicos em duplicidade, o último irá eliminar o anterior.
PubSubClient MQTT(wifiClient);        // Instancia o Cliente MQTT passando o objeto espClient

//Declaração das Funções
void mantemConexoes();  //Garante que as conexoes com WiFi e MQTT Broker se mantenham ativas
void conectaWiFi();     //Faz conexão com WiFi
void conectaMQTT();     //Faz conexão com Broker MQTT
void enviaPacote();     //

void setup() {
  pinMode(pinBotao1, INPUT_PULLUP);         

  Serial.begin(115200);
  SPI.begin();          // Inicia comunicação SPI bus
  mfrc522.PCD_Init();   // Inicia MFRC522
  Serial.println();

  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);   
}

void loop() {
  mantemConexoes();
  enviaValores("");
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
  Serial.print("Conectado com sucesso na rede: ");
  Serial.print(SSID);  
  Serial.print("  IP : ");
  Serial.println(WiFi.localIP()); 
}

void conectaMQTT() { 
    while (!MQTT.connected()) {
        Serial.print("Conectando ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) {
            Serial.println("Conectado ao Broker MQTT!");
        } 
        else {
            Serial.println("Não foi possivel se conectar ao broker.");
            Serial.println("Tentando conectar novamente...");
            delay(2000);
        }
    }
}

String enviaValores(String tag_st) {
        tag_st = tag("");

        if (!tag("")) {  
        MQTT.publish(TOPIC_PUBLISH,tag_str );
        Serial.println("Publish  : 0");
        }

        else{
        MQTT.publish(TOPIC_PUBLISH, tag_str);
        Serial.print("Publish tag :  ");
        Serial.print(tag(""));
        }
}


//_____________________________
// retorna a tag do cartão
String tag(String conteudo){
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
     conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }

  Serial.println();
  conteudo.toUpperCase();

  return conteudo.substring(0);
}