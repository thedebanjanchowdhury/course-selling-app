const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
