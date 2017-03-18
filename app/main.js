var mraa = require('mraa'); //require mraa
//const mqtt = require('mqtt');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to resin.io dashboard logs
//var analogPin0 = new mraa.Aio(2); //setup access analog inpuput pin 0
 //read the pin value as a float

//Touch Sensor connected to D2 connector
 var digital_pin_D2 = new mraa.Gpio(2);
 digital_pin_D2.dir(mraa.DIR_IN);

 //Buzzer connected to D6 connector
 var digital_pin_D6 = new mraa.Gpio(6);
 digital_pin_D6.dir(mraa.DIR_OUT);


digital_pin_D6.write(0);

var touch_sensor_value = 0, last_t_sensor_value;



periodicActivity(); //call the periodicActivity function

function periodicActivity()
{


	touch_sensor_value = digital_pin_D2.read();

	  if (touch_sensor_value === 1 && last_t_sensor_value === 0) {
            console.log("Buzz ON!!!");
            digital_pin_D6.write(touch_sensor_value);
        } else if (touch_sensor_value === 0 && last_t_sensor_value === 1) {
            console.log("Buzz OFF!!!");
            //socket.emit('message', "absent");
            digital_pin_D6.write(touch_sensor_value);
        }

        last_t_sensor_value = touch_sensor_value;


	//var analogValueFloat = analogPin0.read();

 

const client =  mqtt.connect('mqtt://iot.eclipse.org', 1883, 60);


var msg=""+digital_pin_D2;

client.on('connect', function () {

	var topic1 = 'topic/GeneralizedIoT/'+process.env.RESIN_DEVICE_UUID;
	console.log("Connection Successful "+ topic1);

	client.publish(topic1,msg);
});



  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}
