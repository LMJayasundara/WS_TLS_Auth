const fs = require('fs');
const WebSocket = require('ws');
const https = require('https');

const server = new https.createServer({
  cert: fs.readFileSync(`${__dirname}/key/server-crt.pem`),
  key: fs.readFileSync(`${__dirname}/key/server-key.pem`),
  ca: [
    fs.readFileSync(`${__dirname}/key/client-ca-crt.pem`)
  ],
  requestCert: true,
  rejectUnauthorized: true
});

const wss = new WebSocket.Server({
  server,
  verifyClient: (info) => {
    var success = !!info.req.client.authorized;
    console.log(success);
    return true;
  }
});

wss.on('connection', function connection(ws, req) {

  // console.log(req.connection.remoteAddress);
  // console.log(req.socket.getPeerCertificate().subject.CN);
  // console.log(req.method);
  // console.log(req.url);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('hello from server!');
  });
});

server.listen(8080);