const express=require('express');
const homeRouter = express.Router();
const path = require('path');
const rootpath=require('../path/root');
homeRouter.get('/', (req, res) => {
  res.sendFile(path.join(rootpath, 'views', 'home.html'));
});
module.exports = homeRouter;