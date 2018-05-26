'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});