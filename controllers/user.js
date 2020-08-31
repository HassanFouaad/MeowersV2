const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Server ERROR" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.userId).select(
      "-password"
    );
    if (!userFound) {
      return res.status(404).json({ msg: "No User Found!" });
    }
    res.status(200).json(userFound);
  } catch (error) {}
};

exports.editProfile = async (req, res) => {};

exports.userById = async (req, res) => {};
