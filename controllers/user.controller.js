const userModel = require("../models/user.model");

/**
 * GET ALL USERS
 */
const getUser = async (req, res, next) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users
    });
  } catch (err) {
    next(err);
  }
};


/**
 * CREATE USER
 */
const createUser = async (req, res, next) => {
  try {
    const { firstname, lastname, home, role, password } = req.body;

    if (!firstname || !lastname || !password) {
      return res.status(400).json({
        success: false,
        message: "Firstname, lastname and password are required"
      });
    }

    const newUser = await userModel.create({
      firstname,
      lastname,
      home,
      role,
      password
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });

  } catch (err) {

    // duplicate key error (ถ้ามี unique field)
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value"
      });
    }

    next(err);
  }
};


/**
 * UPDATE USER
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update allowed fields only
    const allowedFields = ["firstname", "lastname", "home", "role", "password"];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save(); // จะ trigger hash ถ้า password ถูกแก้

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user
    });

  } catch (err) {
    next(err);
  }
};



/**
 * DELETE USER
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(204).end(); // No content
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
};
