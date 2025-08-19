const express=require('express');

const contactUsRouter = express.Router();

// Use the router for your routes, for example:
contactUsRouter.get('/contact-us', (req, res) => res.send('not get any data'));
contactUsRouter.post('/contact-us', (req, res) => {
  const { name, email, message } = req.body;
  // Handle the form submission, e.g., save to database or send email
  res.send('Form submitted successfully');
  console.log(`Thank you for your message, ${name} ${email} ${message}!`);
});

module.exports=contactUsRouter;
