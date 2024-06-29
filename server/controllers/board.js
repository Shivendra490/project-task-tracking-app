const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.addMember = async (req, res, next) => {
  try {
    const { memberEmail } = req.body;
    console.log("bbbodyyy", req.body);
    if (!memberEmail?.trim()) {
      res.status(403).json({ message: "Email is required" });
      return;
    }

    const isValid = emailRegex.test(memberEmail);

    if (!isValid) {
      res.status(400).json({ message: "Please enter valid email" });
      return;
    }

    const user = await User.findOne({ _id: req.userId });

    // if(user.memberList.length===0){

    // }

    if (user.memberList.includes(memberEmail)) {
      res
        .status(403)
        .json({ message: "Email is already added to the dashbaoard." });
      return;
    }

    user.memberList.push(memberEmail.toLowerCase());
    const updatedUser = await user.save();
    console.log("bbbbbbb", updatedUser);
    const addedEmailId =
      updatedUser.memberList[updatedUser.memberList.length - 1];

    // if (existingUser) {
    //   res.status(403).json({ message: "Email is already registered" });
    //   return;
    // }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const user = new User({
    //   userName: userName,
    //   email: email.toLowerCase(),
    //   password: hashedPassword,
    // });

    // await user.save();
    res.status(201).json({
      message: `${addedEmailId} added to the board`,
      memberList: updatedUser.memberList,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let { userName, email, oldPassword, newPassword } = req.body;

    let emailOrPassUpdated = false;
    const userTobeUpdated = await User.findOne({ _id: req.userId });
    if (!userTobeUpdated) {
      res.status(404).json({ message: "User does not Exist" });
      return;
    }
    if (userTobeUpdated._id.toString() !== req.userId.toString()) {
      res.status(402).json({ message: "Unauthorized to update" });
      return;
    }

    userTobeUpdated.userName = userName || userTobeUpdated.userName;

    if (email) {
      const isValid = emailRegex.test(email);

      if (!isValid) {
        res.status(400).json({ message: "Please enter valid email" });
        return;
      }
      console.log('email',email)
      if (email.toLowerCase() !== userTobeUpdated.email) {
        const isNewEmailAlreadyExist = await User.findOne({
          email: email
        });
        console.log('isNewEmailAlreadyExist',isNewEmailAlreadyExist,'dddddddddddddddddddddddd')
        if (isNewEmailAlreadyExist) {
          res.status(400).json({
            message: "This emailId is already exist,use another emailId",
          });
          return;
        }
        userTobeUpdated.email = email?.toLowerCase().trim();
        emailOrPassUpdated = true;
      }
    }

    if (oldPassword && newPassword) {
      const verifyPassword = await bcrypt.compare(
        oldPassword,
        userTobeUpdated.password
      );

      if (!verifyPassword) {
        res.status(402).json({ message: "Old password is incorrect" });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      userTobeUpdated.password = hashedPassword;
      emailOrPassUpdated = true;
    }

    const updatedUserDetails = await userTobeUpdated.save();

    res.status(200).json({
      message: "Details updated successfully",
      doLogout: emailOrPassUpdated,
      data: {
        userName: updatedUserDetails.userName,
        email: updatedUserDetails.email,
      },
    });
  } catch (err) {
    console.log("EERRRRR", err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // console.log("get single task", req.headers);

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    // console.log("task", task);
    const data={userName:user.userName,email:user.email}

    res.status(200).json({ message: "User Details fetched successfully", data: data });
  } catch (err) {
    console.log(err);
  }
};

