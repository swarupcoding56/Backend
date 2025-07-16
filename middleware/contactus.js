const express = require('express');
const app = express();
const dummymmiddleware = (req, res, next) => {
  console.log(req.path, req.method);
  next();
};
app.use(dummymmiddleware);
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});