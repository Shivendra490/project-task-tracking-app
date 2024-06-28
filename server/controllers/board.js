const User = require("../models/user");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.addMember = async (req, res, next) => {
  try {
    const {  memberEmail } = req.body;
    console.log("bbbodyyy",req.body);
    if (!memberEmail?.trim()) {
      res.status(403).json({ message: "Email is required" });
      return;
    }

    const isValid = emailRegex.test(memberEmail);

    if (!isValid) {
      res.status(400).json({ message: "Please enter valid email" });
      return;
    }

    const user = await User.findOne({ _id:req.userId });

    // if(user.memberList.length===0){
        
    // }

    if(user.memberList.includes(memberEmail)){
        res.status(403).json({message:"Email is already added to the dashbaoard."})
        return 
    }

    user.memberList.push(memberEmail.toLowerCase())
    const updatedUser=await user.save()
    console.log("bbbbbbb",updatedUser)
    const addedEmailId=updatedUser.memberList[updatedUser.memberList.length-1]


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
    res.status(201).json({ message: `${addedEmailId} added to the board`,memberList:updatedUser.memberList });
  } catch (err) {
    console.log(err)
  }
};
