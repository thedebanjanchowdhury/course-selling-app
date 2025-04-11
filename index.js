const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("api/v1/user", userRouter);
app.use("api/v1/course", courseRouter);
app.use("api/v1/admin", adminRouter);

async function main() {
  await mongoose.connect("`${process.env.MONGODB_CONNECTION_STRING}`");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}
