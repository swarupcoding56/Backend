import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/AuthRouter.js";
const app = express();
app.use(cookieParser());
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager");
});
app.use("/auth",AuthRouter)
const PORT=4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});