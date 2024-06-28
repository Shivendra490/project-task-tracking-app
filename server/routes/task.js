const express=require("express")

const router=express.Router()
const taskController=require("../controllers/task");
const { verifyAuth } = require("../middlewares/verifyAuth");

router.post("/create-task",verifyAuth,taskController.createTask)

router.get("/get-task/:taskId",verifyAuth,taskController.getTask)

router.get("/all-status-task",verifyAuth,taskController.getAllStatusTask)

router.delete("/delete-task/:taskId",verifyAuth,taskController.deleteTask)

router.patch("/update-task/:taskId",verifyAuth,taskController.updateTask)


module.exports=router;