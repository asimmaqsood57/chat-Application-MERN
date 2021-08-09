const mongoose = require("mongoose");
const user = require("../models/user");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  //   const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/;

  //   if (emailRegex.test(email)) throw "email is not suppored from your domain";

  if (password.length < 6) throw "password must be atleast 5 letters";

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw "User already exist";

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });
  await user.save();

  res.json({
    message: "user " + name + " regstered Successfully",
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });
  if (!user) throw "email and password did not match";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);
  res.json({
    message: "User Logged in successfully",
    token,
  });
};
