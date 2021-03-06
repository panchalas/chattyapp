//server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');


//set the port to 3001
const PORT = 3001;

//Create a new express Server
const server = express()
  //Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const colorCodes = ['#00ff00', '#ff0000','#0000ff', '#4e2f7a'];
let i = 0;

//Create the WebSockets Server
const wss = new SocketServer({server});

const connectionDetails = {type: 'connectionDetails'};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(ws);
  console.log(wss._server._connections);

  connectionDetails.totalConnections = wss._server._connections;

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    console.log(msg.type);
    switch(msg.type) {
      case 'postMessage':
        console.log('Message: %s said %s',msg.username, msg.content);
        msg.id = uuidv1();    //Generating unique ID for the message
        msg.type = 'incomingMessage';
        //broadcasting the message/notification to all connected clients
        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(msg));
        });
        break;
      case 'postNotification':
        console.log('Notification: %s',msg.content);
        msg.id = uuidv1();
        msg.type = 'incomingNotification';
        //broadcasting the message/notification to all connected clients
        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(msg));
        });
        break;
      case 'connectionDetails':
        connectionDetails.totalConnections = wss._server._connections;

        wss.clients.forEach(function each(client) {
            connectionDetails.color = colorCodes[i];
            client.send(JSON.stringify(connectionDetails));
            i++;
            if(i == colorCodes.length) {
              i=0;
            }
        });
        break;
    }
  });

  //Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      console.log('Client disconnected');
      connectionDetails.totalConnections = wss._server._connections;
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(connectionDetails));
      });
    }
  );
});
