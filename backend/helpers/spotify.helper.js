/* ---Spotify Documentation Given Code---
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
------*/

// const request = require('request');
// const client_id = process.env.SPOTIFY_CLIENT_ID;
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// /**
//  * Reusable function through getToken()
//  * Fetches a private access token from the Spotify API.
//  * This uses the Client Credentials flow.
//  * * @returns {Promise<string>} A Promise (placeholder obj to say that it's currently getting your value) that resolves with the access token string.
//  * @throws {Error} Rejects with an error if the request fails or Spotify returns an error.
//  */
// const getToken = () => {
//   // Two parts: ((resolve and reject possible returns), function)
//   return new Promise((resolve, reject) => {
    
//     const authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       form: {
//         grant_type: 'client_credentials'
//       },
//       json: true
//     };

//     request.post(authOptions, (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         // REJECT the promise if there's an error or bad status
//         return reject(error || body); 
//       }
      
//       // Otherwise, RESOLVE the promise with just the token
//       resolve(body.access_token);
//     });
//   });
// };

// // Makes it so that any other files that 'require' this file
// module.exports = {
//   getToken
// };


// No 'request' import needed! Fetch is built-in.
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

/**
 * @desc Fetches a private access token from the Spotify API.
 * @returns {Promise<string>} A Promise that resolves with the access token string.
 * @throws {Error} Rejects with an error if the request fails.
 */
//async so we can use await (meaning that the following stuff can't be performed until this function is complete)
const getToken = async () => {

  const url = 'https://accounts.spotify.com/api/token';
  
  // NEW: We need to manually create the 'form-encoded' body.
  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');

  // NEW: This is the 'fetch' request.
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // NEW: We must specify the content type for a form.
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    body: body
  });

  // NEW: We parse the response as JSON.
  const data = await response.json();

  // NEW: fetch doesn't throw errors for bad statuses, so we check 'response.ok'.
  if (!response.ok) {
    throw new Error(data.error_description || 'Failed to get token');
  }

  // NEW: We can just return the value directly.
  return data.access_token;
};

/**
 * @desc Searches the Spotify API for a track.
 * @param {string} token - A valid access token (from getToken).
 * @param {string} query - The user's search term (e.g., "Coldplay").
 * @returns {Promise<object>} A Promise that resolves with the raw search results.
 */
const searchForTrack = async (token, query) => {
  
  // NEW: We use URLSearchParams to safely build the search query.
  const params = new URLSearchParams();
  params.append('q', query);
  params.append('type', 'track');
  params.append('limit', 5); // Let's just get the top 5 results

  const url = `https://accounts.spotify.com/api/token`;

  // NEW: This is a GET request to search.
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // NEW: Note the 'Bearer' type, which is standard for API calls.
      'Authorization': 'Bearer ' + token
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Failed to search for track');
  }

  // We return the 'tracks' object from the response.
  return data.tracks;
};

// Export both functions
module.exports = {
  getToken,
  searchForTrack
};