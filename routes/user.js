const express = require("express");
const Router = express.Router;
const userRouter = Router();
const { userModel } = require("../db");

userRouter.post("/signup", (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

userRouter.post("/login", (req, res) => {
  res.json({
    message: "login endpoint",
  });
});

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "purchased courses endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
