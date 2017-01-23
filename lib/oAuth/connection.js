"use strict";
var nforce = require('nforce');



var connection = {};

var org = nforce.createConnection({
	clientId: '3MVG9fMtCkV6eLhecF0wSn0nb4tqemP_c48GeOUyfIhXN6y0Lyg3_KCdBLhW1RI7HZwpPaC8OgbKQX2mB7GRJ',
	clientSecret: '8445520892876821493',
	redirectUri: process.env.REDIRECT_URI,//process.env.REDIRECT_URI,
	apiVersion: 'v36.0',  // optional, defaults to current salesforce API version
	environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
	mode: 'multi', // optional, 'single' or 'multi' user mode, multi default
});

//the above equals to the following
connection.getOrg = function(){
	return org;
};

module.exports = connection;
