var mraa = require('mraa'); //require mraa
const mqtt = require('mqtt');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to resin.io dashboard logs
//var analogPin0 = new mraa.Aio(2); //setup access analog inpuput pin 0
 //read the pin value as a float

//Touch Sensor connected to D2 connector
 var button = new mraa.Gpio(2);
 button.dir(mraa.DIR_IN);

 //Buzzer connected to D6 connector
 var led = new mraa.Gpio(6);
 led.dir(mraa.DIR_OUT);
led.write(0)


var buttonstate = 0, last_t_sensor_value;



periodicActivity(); //call the periodicActivity function

function periodicActivity()
{


	buttonstate = button.read();

	  if (buttonstate === 1 && last_t_sensor_value === 0) {
            console.log("LED ON!!!");
            led.write(buttonstate);
        } else if (buttonstate === 0 && last_t_sensor_value === 1) {
            console.log("LED OFF!!!");
            //socket.emit('message', "absent");
            led.write(buttonstate);
        }

        last_t_sensor_value = buttonstate;


	//var analogValueFloat = analogPin0.read();

 

const client =  mqtt.connect('mqtt://iot.eclipse.org', 1883, 60);


var msg=""+button;

client.on('connect', function () {

	var topic1 = 'topic/GeneralizedIoT/'+process.env.RESIN_DEVICE_UUID;
	console.log("Connection Successful "+ topic1);

	client.publish(topic1,msg);
	console.log("Value of digital pin is: "+msg)
});



  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}
