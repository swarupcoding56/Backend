const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url==='/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
  }
});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});