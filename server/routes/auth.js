const express=require("express")

const router=express.Router()
const authController=require("../controllers/auth")

router.get("/register",authController.registerUser)

module.exports=router;