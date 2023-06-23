import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import { getItemByKey } from './services/Product';

const webSocketsServerPort = 8080;
const webSocketsServer = require('websocket').server
const http= require('http');
const {v4 : uuidv4} = require('uuid')

// Get environment variables
dotenv.config();

// Create the express server and configure it to use json
const app = express();
app.use(express.json());

// Configure cors policy
app.use(cors());

app.use('/', routes);

const server = http.createServer(app);
server.listen(webSocketsServerPort);
console.log('listening on 8080')

const wsServer = new webSocketsServer({
    httpServer: server
});

const clients ={}

wsServer.on('request', (request)=>{
const clientId = uuidv4();
const connection = request.accept(null, request.origin);
clients[clientId] = connection;
console.log(request.origin)
connection.on('message', async (message)=>{
      console.log(message)

      const response = await getItemByKey("pId", message.utf8Data);
      console.log(response)
      
      
      for(const key in clients)
      {
        clients[key].sendUTF(JSON.stringify(response[0]))
        console.log(message.utf8Data)
      }
    })
})
