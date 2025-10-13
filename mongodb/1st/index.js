import express from 'express';
import mongoose from 'mongoose';
import connectDB from './db.js';
import UserRoutes from './Routes/user.route.js';
const app = express();
connectDB();
app.use(express.json());
app.use("/api",UserRoutes);
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.put("/test", (req, res) => {
  console.log("PUT request received!", req.body);
  res.json({ message: "PUT works!", body: req.body });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});