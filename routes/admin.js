const express = require("express");
const Router = express.Router;
const adminRouter = Router();
const { adminModel } = require("../db");

// adminRouter.use(adminMiddleware);

adminRouter.post("/signup", (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

adminRouter.post("/login", (req, res) => {
  res.json({
    message: "login endpoint",
  });
});

adminRouter.post("/course", (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
