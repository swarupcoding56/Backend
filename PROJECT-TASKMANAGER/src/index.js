import express from "express";
import session from "express-session";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});