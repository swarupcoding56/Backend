const { createReadStream } = require('fs');
const https = require('http');
const server = https.createServer();
server.on('request', (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const file = createReadStream('sample.txt');
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        file.pipe(res);
    }
});
const port = 3000;
server.listen(port, () => {
    console.log('server is running at port ' + port);
});