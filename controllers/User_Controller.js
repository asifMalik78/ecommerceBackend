const bcrypt = require("bcrypt");
const User = require("../models/User");

// register user
module.exports.registerUser = async (req, res) => {
  try {
    const user = await User.SignUp(req.body);
    return res.status(201).json({
      user,
      message: "registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// login user
module.exports.logInUser = async (req, res) => {
  try {
    const user = await User.SignIn(req.body);
    return res.status(201).json({
      user,
      message: "logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// update user
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { password  , username , email} = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hshedPassword = await bcrypt.hash(password, salt);

      req.body.password = hshedPassword;
    }
    

    const user = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    const {password:pwsd , ...others} = user._doc;
    return res.status(201).json({
      message: "Updated Successfully",
      user:others,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// delete user
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);

    return res.status(201).json({
      message: "deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// get user (single)
module.exports.getUserSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// get user (all)
module.exports.getUserAll = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};
