/* ---Spotify Documentation Given Code---
var client_id = 'CLIENT_ID';
var client_secret = 'CLIENT_SECRET';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});
------*/

// Chris: I have these from the Spotify API account, just let me know
var client_id = 'CLIENT_ID';
var client_secret = 'CLIENT_SECRET';

// Creating a JS Object called authOptions that'll hold all the required pieces that a requests is gonna need to make a working request to Spotify's API
var authOptions = {
  //The request library we're aiming for
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    // base64 is essentially an encoding to include weird symbols like ':' that can break URIs
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    // Specifically telling Spotify we're getting just regular client credientials for song collection, not user crediential collecting.
    grant_type: 'client_credentials'
  },
  //JSON format
  json: true
};

// Making an HTTP POST request to the URL within authOptions given it's package info. Then, we run the following function.
// Error is what we'll get if nothing happens at all, response will hold the full HTTP response & status code, and lastly, body will hold the data that is actually retrieved from that URL given the authOptions package info.
request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});