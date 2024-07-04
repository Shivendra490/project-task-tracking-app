const User = require("../models/user");
const Task = require("../models/task");
const bcrypt = require("bcryptjs");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.addMember = async (req, res, next) => {
  try {
    const { memberEmail } = req.body;

    if (!memberEmail?.trim()) {
      res.status(403).json({ message: "Email is required" });
      return;
    }

    const isValid = emailRegex.test(memberEmail);

    if (!isValid) {
      res.status(400).json({ message: "Please enternnnn valid email" });
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

    const addedEmailId =
      updatedUser.memberList[updatedUser.memberList.length - 1];

    res.status(201).json({
      message: `${addedEmailId} added to the board`,
      memberList: updatedUser.memberList,
    });
  } catch (err) {
    next(err);
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

      if (email.toLowerCase() !== userTobeUpdated.email) {
        const isNewEmailAlreadyExist = await User.findOne({
          email: email?.toLowerCase(),
        });

        if (isNewEmailAlreadyExist) {
          res.status(400).json({
            message: "Email already exist",
          });
          return;
        }
        const result = await Task.updateMany(
          { assignTo: userTobeUpdated?.email },
          { assignTo: email?.toLowerCase()?.trim() }
        );

        const res = await User.updateMany(
          { memberList: userTobeUpdated?.email },
          { $set: { "memberList.$[elem]": email?.toLowerCase()?.trim() } },
          { arrayFilters: [{ elem: userTobeUpdated?.email }] }
        );
        userTobeUpdated.email = email?.toLowerCase().trim();
        emailOrPassUpdated = true;
      }
    }

    if (oldPassword && newPassword) {
      if (oldPassword.length < 4 || newPassword.lenght < 4) {
        res
          .status(403)
          .json({ message: "Password length should be of atleast 4 chars" });
        return;
      }
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
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const data = { userName: user.userName, email: user.email };

    res
      .status(200)
      .json({ message: "User Details fetched successfully", data: data });
  } catch (err) {
    next(err);
  }
};
