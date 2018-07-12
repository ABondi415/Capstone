'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const api = require('./server/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

app.use(express.static(path.join(__dirname, 'dist')));

// Custom middleware for handling responses
// Do not remove next.  It is necessary for server
app.use((data, request, response, next) => {
  const httpResponseCode = data.Error ? 500 : 200;
  response.writeHead(httpResponseCode, { 'Content-Type': 'application/json' });

  const responseString = JSON.stringify(data);
  response.end(responseString);
});

// Respond with forbidden to requests to root directory
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

const io = socketio(server);
app.set('io', io);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});