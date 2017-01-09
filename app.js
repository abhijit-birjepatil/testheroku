var express = require('express');
var http = require('http');
var env = require('node-env-file');


var nforce = require('nforce');

// Load environment variables for localhost
try {
	env(__dirname + '/process.env');
} catch (e) {console.log("error ", e);}


var org = require('./javascripts/nforceoauth');


var app = express();

var port = process.env.PORT || 6000;
var https_port = process.env.HTTPS_PORT || parseInt(port) + 1;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.get('/oauth', function(req, res) {
	res.redirect(global.org.getAuthUri());
});

app.get('/oauthcallback', function(req, res) {
  global.org.authenticate({code: req.query.code}, function(err, resp){
    if(!err) {
      console.log('Access Token: ' + resp.access_token + ' Refresh Token: ' + resp.refresh_token);
    } else {
      console.log('Error: ' + err.message);
    }
	res.render('oauthcallback', {});    
});
});


/*app.get('/getinfo', function(req, res) {

	var q = 'SELECT Id, Name, CreatedDate, BillingCity FROM Account LIMIT 1';

	global.org.query({ query: q }, function(err, resp){

	  if(!err && resp.records) {

	    var acc = resp.records[0];

		console.log('Acct Name',acc.get('Name'));
		res.redirect('pages/home');
	  }else{

	  			console.log('Error',err);
	  }
	  res.render('oauthcallback', {});	  
  })
});*/

app.get('/getinfo', function(req, res) {
	res.render('pages/home');
});


/*app.get('/oauthcallback', function(req, res) {
	res.render('oauthcallback', {});
});*/

// Create an HTTP service
http.createServer(app).listen(port);
console.log("Server listening for HTTP connections on port ", port);
console.log("Consumer Key ", process.env.APPID);

// Create an HTTPS service if the certs are present
/*try {
	var options = {
	  key: fs.readFileSync('key.pem'),
	  cert: fs.readFileSync('key-cert.pem')
	};
	https.createServer(options, app).listen(https_port);
	console.log("Server listening for HTTPS connections on port ", https_port);
} catch (e) {
	console.error("Security certs not found, HTTPS not available");
}*/

