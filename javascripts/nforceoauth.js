var nforce = require('nforce');

global.org = nforce.createConnection({
  clientId: process.env.APPID,
  clientSecret: process.env.APPKEY,
  redirectUri: 'http://localhost:6000/oauthcallback',
  mode: 'single',
  autoRefresh: true // <--- set this to true
});