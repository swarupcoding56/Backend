const express = require('express');
const contactUsRouter =require('./Router/Contact-Router')
const homeRouter = require('./Router/Home-Router');
const app = express();
const path=require('path');
const rootpath=require('./path/root');
app.use(express.urlencoded({ extended: true }));
app.use(contactUsRouter);
app.use(homeRouter);

// 404 handler middleware
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootpath, 'views', '404.html'));
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});