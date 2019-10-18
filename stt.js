const speech = require('speaktome-node');
var fs = require('fs');

speech.record().then(results => {
  var res = "";
  for(var i = 0; i < results.length; i++){
      console.log(results[i].text);
      res+= results[i].text
  }
  console.log(res);
  if(res.includes('Caspian')){
	console.log('PROMPT FOR AI');
	console.log(res.substring(res.indexOf('Caspian')));
	res = res.substring(res.indexOf('Caspian'));
	fs.writeFile('requests.txt',"\n"+res, function (err){
   		 if (err) throw err;
     });



	}

}).catch(console.error);