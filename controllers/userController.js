const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv").config();

//@desc Register the user
//@route post /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all feilds are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is already registered");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashed password: ", hashPassword);
  const user = await User.create({ email, username, password: hashPassword });
  console.log(user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: "User created successfully",
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login the user
//@route post /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Get the current user
//@route get /api/users/current
//@access public

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "current user" });
});

module.exports = { registerUser, loginUser, currentUser };
