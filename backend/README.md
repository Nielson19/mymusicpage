# Code Notes & Learnings Log
This is an optional log of what we have done for each file to help understand the different parts without flooding the files with comments.

# /(backend global)
### /package.json & /package-lock.json
These are all the dependecies necessary to download in order to test out the code. Otherwise, a lot of different moving parts won't work properly

* The easiest way to get all the dependecies is changing directory into the backend folder 'cd backend' (while in the mymusicpage directory) and then doing 'npm install'

    * 'npm install' will simply download everything within the package.json file with the same dependecies and their versions that everyone will collectively be using.

### /.env (Environment Variables)
Every developer will individually have their own .env file that is .gitignore'd. This allows for our safekeeping of different secrets like API keys.

* The dotenv package (npm install dotenv) is needed to load these variables into the app.

* You must call require('dotenv').config() at the very top of index.js for it to work.

* Best Practice: No spaces around the '=' symbol (this can mess up how the secret is put into the code).

### /index.js
This is going to be the front door of the app. It'll start up the server with 'app.listen()', load up the middleware, and then hand off any requests made to their respective routes.

## /controllers
### /song.controller.js

## /data

## /helpers
### /spotify.helper.js
Purpose: This file's only job is to talk to Spotify. It's a "specialist" in a sense. (Chris: Still fully understanding)

* Chris: If you guys need the Spotify API account key, just lmk

getToken() Function:

* This function uses the Client Credentials Flow. This is a server-to-server request that doesn't need a user to log in. It's gonna work great for getting public data, like searching the song catalog.

* It uses request.post to send a POST request to Spotify's token endpoint.

The authOptions object packages up all the settings for the request.

## /models
### /playlist.model.js
### /post.model.js
### /song.model.js
### /user.model.js

## /node_modules

## /routes
### /song.route.js