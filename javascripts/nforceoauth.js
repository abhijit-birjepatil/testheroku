var nforce = require('nforce');

global.org = nforce.createConnection({
  clientId: process.env.APPID,
  clientSecret: process.env.APPKEY,
  redirectUri: 'https://abhijitfirstapp.herokuapp.com/oauthcallback',
  mode: 'single',
  autoRefresh: true // <--- set this to true
});