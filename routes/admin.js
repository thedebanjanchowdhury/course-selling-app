const express = require("express");
const Router = express.Router;
const adminRouter = Router();

adminRouter.use(adminMiddleware);

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

adminRouter.post("/course", adminMiddleware, (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

adminRouter.put("/course", adminMiddleware, (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

adminRouter.get("/course/bulk", adminMiddleware, (req, res) => {
  res.json({
    message: "singup endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
