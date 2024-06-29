const express=require("express")

const router=express.Router()
const boardController=require("../controllers/board");
const { verifyAuth } = require("../middlewares/verifyAuth");

router.post("/add-member",verifyAuth,boardController.addMember)

router.patch("/update-user/:userId",verifyAuth,boardController.updateUser)

router.get("/get-user/:userId",verifyAuth,boardController.getUser)




module.exports=router;