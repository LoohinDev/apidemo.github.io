const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  home: String,
  role: {
    type: String,
    default: "user"
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // ⚠️ ไม่ให้ query password ออกมาโดย default
  }
});

//Hash password อัตโนมัติก่อน save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//เพิ่ม method สำหรับ compare ตอน login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};



module.exports = mongoose.model("user", userSchema, "user");
