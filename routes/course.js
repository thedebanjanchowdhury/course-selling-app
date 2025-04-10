const express = require("express");
const Router = express.Router;
const courseRouter = Router();

courseRouter.post("/buy", (req, res) => {
  res.json({
    message: "course buy endpoint",
  });
});

courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "fetch all courses endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
