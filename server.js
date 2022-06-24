const fs = require('fs');
const WebSocket = require('ws');
const https = require('https');

const processRequest = (req, res) => {
  res.writeHead(200);
  res.end ('Hello Done\ n ');
};

const server = new https.createServer({
  cert: fs.readFileSync(`${__dirname}/key/server-crt.pem`),
  key: fs.readFileSync(`${__dirname}/key/server-key.pem`),
  ca: [
    fs.readFileSync(`${__dirname}/key/client-ca-crt.pem`)
  ],
  requestCert: true,
  rejectUnauthorized: true,
  secureProtocol: 'TLS_method',
  ciphers: 'AES128-GCM-SHA256:AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384',
  ecdhCurve: 'secp521r1:secp384r1',
  honorCipherOrder: true
}, processRequest);

const wss = new WebSocket.Server({
  server,
  verifyClient: (info) => {
    // console.log(info.req.client);
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