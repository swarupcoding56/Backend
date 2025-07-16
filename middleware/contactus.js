const express = require('express');
const app = express();
const dummymmiddleware1 = (req, res, next) => {
  console.log("first middle ware ",req.path, req.method);
  next();
};
const dummymmiddleware2 = (req, res, next) => {
  console.log("second middle ware ",req.path, req.method);
  next();
};
const responseMiddleware = (req, res, next) => {
  console.log('Response from contact us middleware');
  next();
};
const homeMiddleware = (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>');
};
const contactUsMiddleware = (req, res) => {
  res.send(
    `<h1>Contact Us Page</h1>
    <form action="/contactus" method="POST">
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Submit</button>
    </form>`);
};
const handlepost = (req, res) => {
  const data = [];
  req.on('data', (chunk) => {
    data.push(chunk);

  });
  req.on('end', () => {
    const body = Buffer.concat(data).toString();
    const parsedData = new URLSearchParams(body);
    const dataobject=Object.fromEntries(parsedData.entries());
    console.log('Parsed Data:', dataobject);
    res.send(`<h1>Thank you for contacting us!</h1>
    <p>Name: ${dataobject.name}</p>
    <p>Email: ${dataobject.email}</p>
    <p>Message: ${dataobject.message}</p>`);
  });
};
app.use(dummymmiddleware1);
app.use(dummymmiddleware2);
app.use(responseMiddleware);
app.get("/", homeMiddleware);
app.get("/contactus", contactUsMiddleware);
app.post("/contactus", handlepost);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});