const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

// 🔒 pre-save hook: password hash করার জন্য
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // যদি password পরিবর্তন না হয়, তাহলে hash করবে না
  const salt = await bcrypt.genSalt(10); // 🔹 এখানে salt মানে হলো random data
  this.password = await bcrypt.hash(this.password, salt); // password + salt = hashed password
  next();
});

// ✅ password তুলনা করার জন্য method
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = models.Admin || model("Admin", adminSchema)
module.exports = Admin;
