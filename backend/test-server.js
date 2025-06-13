const http = require('http');
const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  console.log('Received /test');
  res.send('Test successful');
});

// Create HTTP server and listen on IPv4 only:
const server = http.createServer(app);

server.listen(3307, '0.0.0.0', () => {
  console.log('Test server listening on port 3307 (IPv4 only)');
});




