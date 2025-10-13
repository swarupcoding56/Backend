import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import studentRouter from "./routes/student.router.js";
import ejs from "ejs";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.render("form", { title: "Home" });
});
app.use("/api", studentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});