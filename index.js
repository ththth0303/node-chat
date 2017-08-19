var http = require('http');
var port = Number(process.env.PORT || 443);
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello Node.js\n');
}).listen(port);
console.log('Server running');