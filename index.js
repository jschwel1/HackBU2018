var express = require('express')
var app = express()
var path    = require("path");

app.use(express.static('node_modules'));
app.use(express.static('public'));

var lastState;

var exec = require('child_process').exec;

exec('sudo pigpiod', function(error, stdout, stderr) {
        console.log(stderr)
});

exec('lt --port 8000 --subdomain hh217', function(error, stdout, stderr) {
	console.log(stderr)
});

var paused = false;

app.get('/goForward', function (req, res) {
	
	if(paused){
		 res.send('paused');
	}
	else{
		lastState="goForward";
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 255 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 255', function(error, stdout, stderr) {});
	}
  
})
app.get('/Backward', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		lastState="Backward";
		 res.send('done');
		   exec('pigs m 3 w |pigs p 3 255 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 255 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
	}
})
app.get('/Left', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		lastState="Left";
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 255 | pigs m 5 w | pigs p 5 255 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
	}
})
app.get('/Right', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		lastState="Right";
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 255 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 255', function(error, stdout, stderr) {});
	}
})
app.get('/Stop', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
	}
})

app.get('/goForwardLeft', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 255 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
	}
})

app.get('/goForwardRight', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 255', function(error, stdout, stderr) {});
	}
})

app.get('/goBackwardLeft', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 255 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
	}
})

app.get('/goBackwardRight', function (req, res) {
  if(paused){
		 res.send('paused');
	}
	else{
		 res.send('done');
		   exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 255', function(error, stdout, stderr) {});
	}
})

app.get('/Pause', function (req, res) {
  res.send('done');
	 exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
	paused=true;
	
})

app.get('/Resume', function (req, res) {
  res.send('done');
	//stop
	paused=false;
	restoreState();
	
})

app.get('/index', function (req, res) {
   res.sendFile(path.join(__dirname+'/index.html'));
  
})

app.listen(8000, function () {
  console.log('Hacking the (foreman) mainframe...')
})

function restoreState(){
		console.log(lastState)
	switch(lastState){
		case 'goForward':
			console.log("test Forward");
			exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 255 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 255', function(error, stdout, stderr) {});
			break;
		case 'Backward':
			exec('pigs m 3 w |pigs p 3 255 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 255 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
			break;
		case 'Left':
			exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 255 | pigs m 5 w | pigs p 5 255 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
			break;
		case 'Right':
			 exec('pigs m 3 w | pigs p 3 255 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 255', function(error, stdout, stderr) {});
			break;
		case 'Stop':
			 exec('pigs m 3 w | pigs p 3 0 | pigs m 4 w | pigs p 4 0 | pigs m 5 w | pigs p 5 0 | pigs m 6 w | pigs p 6 0', function(error, stdout, stderr) {});
			break;
	}
}
