"use strict";
var express = require('express');
var oauth = require('./lib/oAuth/oauth');
var port = process.env.PORT || 3000;
var env = require('node-env-file');

var app = express();

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); //app.use(app.router);

// Load environment variables for localhost
try {
	env(__dirname + '/process.env');
} catch (e) {console.log("error ", e);}


// Require Routes js
var routesHome = require('./routes/home');

// Serve static files
app.use(express.static(__dirname + '/public'));

app.use('/home', routesHome);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	oauth.redirectToHome(res, app);
	//oauth.redirectAuthURI(res);
});

app.get('/oauthcallback', function(req, res) {
	oauth.authenticate(req, res, app);
});

app.get('/renewUserAccess', function(req, res) {
	oauth.redirectAuthURI(res);
});

// Served Localhost
console.log('Served: http://localhost:' + port);
app.listen(port);