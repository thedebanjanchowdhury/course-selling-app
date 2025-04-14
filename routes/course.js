const express = require("express");
const Router = express.Router;
const courseRouter = Router();
const { courseModel } = require("../db");
const userMiddleware = require("../middleware/user");

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  userId = req.userId;
  courseId = req.body.courseId;
  const user = await courseModel.create({
    userId,
    courseId,
  });
  res.json({
    message: "Your have successfully purchased the course",
  });
});

courseRouter.get("/preview", async (req, res) => {
  const courses = await courseModel.find({})
  res.json({courses})
});

module.exports = {
  courseRouter: courseRouter,
};
