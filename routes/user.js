const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../db");

const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { parse } = require("dotenv");
const JWT_SECRET = "my-jwt-secret";

// input data validation
const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

// signup routing point
userRouter.post("/signup", async (req, res) => {
  const parseResult = userSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.format() });
  }
  const { firstName, lastName, email, password } = parseResult.data;

  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET
    );

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
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
