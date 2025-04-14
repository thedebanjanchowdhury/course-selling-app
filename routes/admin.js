const express = require("express");
const Router = express.Router;
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");

const adminSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

adminRouter.post("/signup", async (req, res) => {
  const parseResult = adminSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.format() });
  }

  const { firstName, lastName, email, password } = parseResult.data;
  try {
    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await adminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User Created Successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      req.status(403).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      `${process.env.JWT_ADMIN_SECRET}`
    );
    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  try {
    const { title, description, price, imageURL } = req.body;
    const course = await courseModel.create({
      title,
      description,
      price,
      imageURL,
      creatorId: adminId,
    });
    res.json({
      message: "Course created successfully",
      courseId: course._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, price, imageURL, courseId } = req.body;
  try {
    const course = await courseModel.updateOne(
      { _id: courseId, creatorId: adminId },
      {
        title,
        description,
        price,
        imageURL,
      }
    );
    res.json({ message: "Course updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  try {
    const course = await courseModel.find({ creatorId: adminId });
    res.json({ message: "Course updated successfully", courses: course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
