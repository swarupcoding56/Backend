import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import studentRouter from "./routes/student.router.js";
import  passport  from "passport";
import session from "express-session";
import initpassport from "./config/passport.js"

const app = express();
const port = 3000;

app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(session({
  secret:"secretkey",
  saveUninitialized:false,
  resave:false,
  cookie: { secure: false }
}))
initpassport(passport)
app.use(passport.initialize())
app.use(passport.session());
app.use("/api", studentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});