const { write } = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url==='/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome to The CALCULATOR PROJECT WITH BACKEND</h1>');
    res.write('<a href="/calculator">GO to calculator</a><br>');
    return res.end();
  }
    if (req.url === '/calculator') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Calculator</h1>');
        res.write('<form action="/calculate" method="post">');
        res.write('Number 1: <input type="text" name="num1"><br>');
        res.write('Number 2: <input type="text" name="num2"><br>');
        res.write('<button type="submit">Calculate</button>');
        res.write('</form>');
        return res.end();
    }
    if (req.url === '/calculate' && req.method === 'POST') {
    const body=[];
    req.on('data', chunk => {
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const params = new URLSearchParams(parsedBody);
        const num1 = Number(params.get('num1'));
        const num2 = Number(params.get('num2'));
        const sum=num1+num2;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Result</h1>');
        res.write(`<p>The sum of ${num1} and ${num2} is ${sum}</p>`);
        res.write('<a href="/calculator">Go back to calculator</a>');
        return res.end();
    });

}});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});