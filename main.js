//NODEJS libraries
var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var bodyParser = require('body-parser');
var config = require('config.js');

//Constants
const APIPORT = 3000;
const SOCKETPORT = 5000;
const HOST = 'localhost';

//Create server and socket connections
var apiServer = express();
var socketsServer = http.createServer();
var sockets = socketIo.listen(socketsServer);

//Setup body parser
apiServer.use(bodyParser.json());

//REST API
apiServer.post('/presentation-remote', function(request, response){
  if(request.body.api_key == ){
    var page = request.body.page_number;
    sockets.emit("presentation-page", page);
  }
  response.status(200).send({data: 'ok'});
})

//Open ports for API and sockets
apiServer.listen(APIPORT, HOST);
socketsServer.listen(SOCKETPORT, HOST);
