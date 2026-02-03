const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    home: String,
    role: String
});


module.exports = mongoose.model("user", userSchema, "user");
