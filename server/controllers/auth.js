const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv").config()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.registerUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    
    if (!userName?.trim() || !email?.trim() || !password?.trim()) {
      res.status(403).json({ message: "All Fields are mandatory" });
      return;
    }

    const isValid = emailRegex.test(email);

    if (!isValid) {
      res.status(400).json({ message: "Please enter valid email" });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      res.status(403).json({ message: "Email is already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userName: userName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email?.trim() || !password?.trim()) {
      res.status(403).json({ message: "All Fields are mandatory" });
      return;
    }

    const isValid = emailRegex.test(email);

    if (!isValid) {
      res.status(403).json({ message: "Please enter valid email" });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (!existingUser) {
      res.status(402).json({ message: "Email or Password is incorrect" });
      return;
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!verifyPassword) {
      res.status(402).json({ message: "Email or Password is incorrect" });
      return;
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "240h" }
    );

    res.status(200).json({
      message: "login Successfully",
      data: {
        email: existingUser.email,
        userId: existingUser._id,
        userName: existingUser.userName,
        token: token,
      },
    });
  } catch (err) {
    next(err)
  }
};
