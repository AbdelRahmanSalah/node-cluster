const http = require('http');

// Workers can share any TCP connection
// In this case it is an HTTP server
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
  process.send({ cmd: 'notifyRequest' });
}).listen(8000);
