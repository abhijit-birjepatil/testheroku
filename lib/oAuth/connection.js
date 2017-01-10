"use strict";
var nforce = require('nforce');

var connection = {};

var org = nforce.createConnection({
	clientId: '3MVG9fMtCkV6eLhecF0wSn0nb4okB1XZxTOd3apT7aq43djDiIqYK0OpkJpvPaO653bT5AU6mJiL8n7e.tMUu',
	clientSecret: '9065238804473607843',
	redirectUri: process.env.REDIRECT_URI,
	apiVersion: 'v36.0',  // optional, defaults to current salesforce API version
	environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
	mode: 'multi', // optional, 'single' or 'multi' user mode, multi default
});

//the above equals to the following
connection.getOrg = function(){
	return org;
};

module.exports = connection;
