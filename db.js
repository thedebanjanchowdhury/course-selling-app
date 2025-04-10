const { Schema, default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  _id: Object,
  name: String,
  email: String,
  password: String,
});

const adminSchema = mongoose.Schema({
  _id: Object,
  name: String,
  email: String,
  password: String,
});

const courseSchema = mongoose.Schema({
  _id: Object,
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = mongoose.Schema({
  _id: ObjectId,
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);
