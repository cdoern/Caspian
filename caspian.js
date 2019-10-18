var fs = require('fs');
var sleep = require('system-sleep');
var say = require('say');
var pm2 = require('pm2');
var tz = require('tz-lookup');
//const Say = require('say').Say
//const say = new Say('darwin' || 'win32' || 'linux')
var cityTimezones = require('city-timezones');
var moment = require('moment-timezone');
  var requests = ['weather', 'time', 'programs', 'math'];
  var affirmative = ['yes', 'yeah', 'sure', 'ok', 'alright'];
  var negative = ['no', 'nope', 'nah'];
 module.exports = {
 response: function(request){
 var request =  request;
  for(var i = 0; i < requests.length; i++){
        if(request.includes(requests[i])){
            switch (requests[i]) {
                case "weather": weather(); break;
                case "time": time("America/New_York"); break;
                case "programs": programs(); break;
                case "math": math(); break;
            }
        }
  }

  function weather(){
    var lat = 0.0;
    var long = 0.0;
    let request2 = require('request');
    let city = 'Boston';
    let apiKey = '820369c2d5f12d4c0d6d5605d5d5d6ac';
    if(request.substring(request.indexOf('weather') + 26) != ""){
      console.log(request.substring(request.indexOf('weather') + 26));
     city = (request.substring(request.indexOf('weather') + 26));
     var lat = parseFloat(request.substring(request.indexOf('weather') + 8, request.indexOf('weather') + 16));
     var long = parseFloat(request.substring(request.indexOf('weather') + 17 , request.indexOf('weather') + 25));
    }
    else{
     city = 'New York City'
     lat = 40.7128;
     long = -74.0060;
    }


    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
    //let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    
    request2(url, function (err, response, body) {
      if(err){
        console.log('error:', error);
      } else {
        console.log('body:', body);
        var weather = JSON.parse(body);
        console.log(weather);
        say.speak("It is " + weather.main.temp + "degrees fahrenheit and " + weather.weather[0].main + " In " + weather.name);
      }
    });

fs.writeFile('processed.txt',"" ,function (err){
    if (err) throw err;
   });

  }

  function time(place){
    if(request.substring(request.indexOf('time') + 5) != ""){
        console.log('place exists');
        console.log(request.substring(request.indexOf('time') +5));
	var res = request.substring(request.indexOf('time') +5) + ' US';
console.log(res);
var timezone = "";
    var lat = request.substring(request.indexOf('time') + 5, request.indexOf('time') + 13)
    var long = request.substring(request.indexOf('time') + 14 , request.indexOf('time') + 22)
    console.log(lat + " " + long)
    console.log(tz(lat, long));
    timezone = tz(lat, long);
      var time = '' + (moment.tz(timezone).format());
     var time = time.substring(time.indexOf('T') + 1 , time.indexOf('T') + 9);
     console.log(time);
     say.speak("The time is "+ time);
     sleep(2000);
    }
fs.writeFile('processed.txt',"", function (err){
    if (err) throw err;
   });
  }
function programs(){
var str = "";
     pm2.list(function (err, list) {
        if(err){
            console.log(err);
        }
        else{
            console.log(list);
	   str = "The following programs are running: ";
	    for(var i = 0; i < list.length; i++){
		str+= list[i].name + " with status " + list[i].pm2_env.status + " ";

		}
		say.speak(str);
		fs.writeFile('processed.txt',"" ,function (err){
    		if (err) throw err;
   		});
		sleep(12000);
		pm2.restart('stt');	
        }
    });
  }
  function math(){
    var res = request.substring(5);
    console.log(eval(res));
    say.speak(res + " equals " + eval(res));

    }
  } 
}
