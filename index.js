const express = require("express");
const app = express();

app.post("/user/signup", (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

app.post("/user/login", (req, res) => {
  res.json({
    message: "login endpoint",
  });
});

app.post("/buycourse", (req, res) => {
  res.json({
    message: "course buy endpoint",
  });
});

app.get("/allcourses", (req, res) => {
  res.json({
    message: "fetch all courses endpoint",
  });
});

app.get("/user/purchased", (req, res) => {
  res.json({
    message: "purchased courses endpoint",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
