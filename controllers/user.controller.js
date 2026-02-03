const userModel = require("../models/user.model");

const getUser = async (req, res, next) => {
    console.log('GET')
  try {
    const users = await userModel.find()
    console.log(users)
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports  = {
  getUser,
};
