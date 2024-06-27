const Task = require("../models/task");
exports.createTask = async (req, res, next) => {
  try {
    const { title, status, priority, checkList, dueDate } = req.body;
    console.log(req.body);

    if (
      checkList?.length === 0 ||
      !title?.trim() ||
      !status?.trim() ||
      !priority?.trim() ||
      checkList?.some((option) => {
        console.log(option);
        return option?.checkText?.trim() === "";
      })
    ) {
      res
        .status(403)
        .json({
          message: "All Fields and atleast one checklist option are mandatory",
        });
      return;
    }

    const task = new Task({
      title,
      status,
      priority,
      checkList,
      userId: req.userId,
      dueDate,
    });

    const newTask = await task.save();
    res.status(201).json({ message: "All Fields are valid", data: newTask });
  } catch (err) {}
};

exports.getAllStatusTask = async (req, res, next) => {
  try {
    console.log("getAllstatustask", req.headers);

    const allStatusTask = await Task.find({ userId: req.userId });

    res
      .status(200)
      .json({ message: "All tasks fetched successfully", data: allStatusTask });
  } catch (err) {}
};


exports.deleteTask = async (req, res, next) => {
  try {
    const {taskId}=req.params
    console.log('taskId',taskId)
    // console.log('deletetask',req.headers);

    const taskTobeDeleted=await Task.findOne({_id:taskId})
    if(!taskTobeDeleted){
      res.status(404).json({ message: "Task not found" });
    }
    if(taskTobeDeleted.userId.toString()!==req.userId.toString()){
      res.status(402).json({ message:"Unauthorized to deleted" });
    }
    const deletedTask=await Task.findOneAndDelete({_id:taskId})
    console.log(taskTobeDeleted,'deletedTask',deletedTask)
    res.status(200).json({ message: "Task Deleted",data:deletedTask });
      
  } catch (err) {}
};