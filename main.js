import express from "express";
import http from "http";
import { Server } from "socket.io";
import config from './config.js';

//Create server and socket connections
const apiServer = express();
const socketsServer = http.createServer();
const sockets = new Server(socketsServer);

//Setup body parser
//REST API
apiServer.post('/presentation-remote', (request, response) => {
  if (request.body.api_key === config.password) {
    const page = request.body.page_number;
    sockets.emit("presentation-page", page);
  }
  response.status(200).send({ data: 'ok' });
})

//Open ports for API and sockets
apiServer.listen(config.apiSocket, config.host);
socketsServer.listen(config.socketPort, config.host);
