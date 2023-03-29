let http = require('http');
const routes = require('./routes');


// whenever any request will come this function will execute
const server = http.createServer(routes)

// after creating the server we have to listen the request
server.listen(3001);