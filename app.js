'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const api = require('./src/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

// Custom middleware for handling responses
app.use((data, request, response, next) => {
  let httpResponseCode = data.Error ? 500 : 200;
  response.writeHead(httpResponseCode, { 'Content-Type': 'application/json' });

  let responseString = JSON.stringify(data);
  response.end(responseString);
});

// Respond with forbidden to requests to root directory
app.get('/', (request, response) => {
  response.status(403).end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});