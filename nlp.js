var fs = require('fs');
const cities = require('cities.json');
var caspian = require('./caspian.js');
var extractNumbers = require('extract-numbers');
var request = '';
var lastrequest = "";
var splitup = "";
var city = "";
var requests = ['weather', 'time', 'programs', '+', '*', '/', '-'];
var math = ['+', '*', '/', '-'];
var affirmative = ['yes', 'yeah', 'sure', 'ok', 'alright'];
var negative = ['no', 'nope', 'nah'];
var text = fs.readFileSync("requests.txt").toString('utf-8');
var textByLine = text.split("\n")
textByLine.forEach(function(entry) {
    request = entry;
  });
for(var i = 0; i < requests.length; i++){
      if(request.includes(requests[i])){
          splitup+=requests[i];
      }
}

if(splitup!=""){
  for(var j = 0; j < cities.length; j++){
        if(request.includes(cities[j].name) && city.length <= (cities[j].name.length + cities[j].lat.length + cities[j].lng.length + 2 )){
 console.log(cities[j]);
	    if((cities[j].country) === 'US'){
            city = cities[j].lat+" "+cities[j].lng +" "+cities[j].name;
            console.log(cities[j]);
	        }
        }
     }  
     splitup+=" "+city;
     console.log(splitup);
    for(var i = 0; i < math.length; i++){
      if(request.includes(math[i])){
       var nums = extractNumbers(request)
        splitup = "math " + nums[0] + " " + splitup + nums[1];
        console.log(splitup);    
      }
    }
   fs.writeFile('requests.txt',"", function (err){
          if (err) throw err;
         });
caspian.response(splitup);
}

      
  