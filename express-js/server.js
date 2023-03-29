let http = require('http');
const express = require('express');
// express is middleware and framework for makes life easy 
const app = express();

// use method is call on every incoming request
app.use((req, res, next) => {
    console.log('in middleware');
    next(); // Allows the request to continue to the next middleware in the line, without next it will not go in next use method
})

// whenever any request will come this function will execute
const server = http.createServer(app)

// after creating the server we have to listen the request
server.listen(3001);