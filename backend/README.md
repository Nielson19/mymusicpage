# MyMusicPage - Backend

## Express, MongoDB, and Node.js

* npm i :for installing dependenices
* npm run dev :to start server

Port runs localhost:3002

## API endpoints

GET:
* /api 

POST:
* /api/register
* /api/login

# For Debugging:
## HTTP status codes
### 1xx: Informational
* 100 Continue            - Client should continue with request
* 101 Switching Protocols - Server is switching protocols (e.g., to WebSocket)

### 2xx: Success
* 200 OK                  - Standard success for GET/PUT/PATCH
* 201 Created             - Resource successfully created (usually POST)
* 202 Accepted            - Request accepted for processing, but not completed
* 204 No Content          - Request succeeded, but no content returned (often DELETE)

### 3xx: Redirection
* 301 Moved Permanently   - Resource moved to a new URL permanently
* 302 Found               - Resource moved temporarily
* 304 Not Modified        - Cached version is still valid
* 307 Temporary Redirect  - Like 302, but method (POST/GET) must not change
* 308 Permanent Redirect  - Like 301, but method (POST/GET) must not change

### 4xx: Client Errors
* 400 Bad Request         - Server cannot process request (syntax error)
* 401 Unauthorized        - Authentication is required and has failed/missing
* 403 Forbidden           - Server understands request but refuses (permissions)
* 404 Not Found           - Resource does not exist
* 405 Method Not Allowed  - HTTP method not supported for this resource
* 408 Request Timeout     - Server timed out waiting for the request
* 409 Conflict            - Request conflicts with current state (e.g., duplicate entry)
* 410 Gone                - Resource is permanently gone
* 418 I'm a teapot        - (April Fools joke, but sometimes used)
* 422 Unprocessable       - Semantic error (validation failed)
* 429 Too Many Requests   - Rate limiting applied

### 5xx: Server Errors
* 500 Internal Server Err - Generic server error
* 501 Not Implemented     - Server lacks capability to fulfill request
* 502 Bad Gateway         - Invalid response from an upstream server
* 503 Service Unavailable - Server overload or maintenance
* 504 Gateway Timeout     - Upstream server failed to send request in time


