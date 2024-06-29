const Task = require("../models/task");
const User=require(("../models/user"))
exports.createTask = async (req, res, next) => {
  try {
    const { title, status, priority, checkList, dueDate, tickCount,assignTo } = req.body;
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
      res.status(403).json({
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
      assignTo,
      tickCount: tickCount || 0,
    });

    const newTask = await task.save();
    res.status(201).json({ message: "All Fields are valid", data: newTask });
  } catch (err) {}
};

exports.getAllStatusTask = async (req, res, next) => {
  try {
    console.log("getAllstatustask", req.headers);

    const allStatusTask = await Task.find({ userId: req.userId });
    const user=await User.findOne({_id:req.userId})
    console.log('gggggggggggggggggggg',user)
    res
      .status(200)
      .json({ message: "All tasks fetched successfully", data: allStatusTask,memberList:user.memberList });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    console.log("taskId", taskId);
    // console.log('deletetask',req.headers);

    const taskTobeDeleted = await Task.findOne({ _id: taskId });
    if (!taskTobeDeleted) {
      res.status(404).json({ message: "Task not found" });
    }
    if (taskTobeDeleted.userId.toString() !== req.userId.toString()) {
      res.status(402).json({ message: "Unauthorized to deleted" });
    }
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });
    console.log(taskTobeDeleted, "deletedTask", deletedTask);
    res.status(200).json({ message: "Task Deleted", data: deletedTask });
  } catch (err) {
    console.log(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    // console.log("get single task", req.headers);

    const task = await Task.findOne({ _id: taskId });
    console.log('taskkkkkkkkkkkkkkk find onee',task)
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return
    }
    console.log("task", task);

    res.status(200).json({ message: "Task fetched successfully", data: task });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    // console.log("for updation taskId", taskId, "body", req.body);
    // console.log('deletetask',req.headers);
    let {
      title,
      status,
      priority,
      checkList,
      userId,
      dueDate,
      tickCount,
      optionId,
      isCheck,
      assignTo
    } = req.body;

    if (
      checkList?.length === 0 ||
      checkList?.some((option) => {
        console.log(option);
        return option?.checkText?.trim() === "";
      })
    ) {
      res.status(403).json({
        message: "All Fields and atleast one checklist option are mandatory",
      });
      return;
    }

    const taskTobeUpdated = await Task.findOne({ _id: taskId });
    if (!taskTobeUpdated) {
      res.status(404).json({ message: "Task not found" });
    }
    if (taskTobeUpdated.userId.toString() !== req.userId.toString()) {
      res.status(402).json({ message: "Unauthorized to update" });
      return;
    }

   console.log('asssssssssing TToooooo',assignTo)
    if (optionId) {
      taskTobeUpdated.checkList = taskTobeUpdated.checkList.map(
        (currentOption) => {
          if (currentOption.optionId.toString() === optionId.toString()) {
            return { ...currentOption, isTick: isCheck };
          } else {
            return currentOption;
          }
        }
      );
    } else {
      taskTobeUpdated.checkList = checkList || taskTobeUpdated.checkList;
    }

    taskTobeUpdated.title = title || taskTobeUpdated.title;
    taskTobeUpdated.status = status || taskTobeUpdated.status;
    taskTobeUpdated.priority = priority || taskTobeUpdated.priority;
    // taskTobeUpdated.checkList = checkList;
    taskTobeUpdated.userId = userId || taskTobeUpdated.userId;
    taskTobeUpdated.dueDate = dueDate || taskTobeUpdated.dueDate;
    taskTobeUpdated.assignTo=assignTo || taskTobeUpdated.assignTo;
    taskTobeUpdated.tickCount = taskTobeUpdated?.checkList?.reduce(
      (acc, current) => {
        if (current.isTick) {
          return acc + 1;
        } else {
          return acc + 0;
        }
      },
      0
    );

    const updatedTask = await taskTobeUpdated.save();
    res
      .status(200)
      .json({ message: "Task Updated successfully", data: updatedTask });

    // title,
    //   status,
    //   priority,
    //   checkList,
    //   userId: req.userId,
    //   dueDate,
    //   tickCount:tickCount || 0
    // const deletedTask=await Task.findOneAndDelete({_id:taskId})
    // console.log(taskTobeDeleted,'deletedTask',deletedTask)
    // res.status(200).json({ message: "Task Deleted",data:deletedTask });
  } catch (err) {
    console.log("EERRRRR", err);
  }
};
