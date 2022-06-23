const WebSocket = require('ws');
const fs = require('fs');

// In order to handle self-signed certificates
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ws = new WebSocket('wss://localhost:8080',{
  key: fs.readFileSync(`${__dirname}/key/client-key.pem`),
  cert: fs.readFileSync(`${__dirname}/key/client-crt.pem`),
  ca: [
    fs.readFileSync(`${__dirname}/key/server-ca-crt.pem`)
  ],
  requestCert: true,
  rejectUnauthorized: true
});

ws.on('open', function open() {
  ws.send('hello from client');
});

ws.on('message', function incoming(data) {
  console.log(data.toString());
  ws.close(); // Done
});

ws.addEventListener('error', (err) => {
  console.log(err.message)
});