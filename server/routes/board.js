const express=require("express")

const router=express.Router()
const boardController=require("../controllers/board");
const { verifyAuth } = require("../middlewares/verifyAuth");

router.post("/add-member",verifyAuth,boardController.addMember)

// router.get("/get-task/:taskId",verifyAuth,taskController.getTask)

// router.get("/all-status-task",verifyAuth,taskController.getAllStatusTask)

// router.delete("/delete-task/:taskId",verifyAuth,taskController.deleteTask)

// router.patch("/update-task/:taskId",verifyAuth,taskController.updateTask)


module.exports=router;