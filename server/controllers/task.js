const Task = require("../models/task");
const User = require("../models/user");
exports.createTask = async (req, res, next) => {
  try {
    const { title, status, priority, checkList, dueDate, tickCount, assignTo } =
      req.body;

    if (
      checkList?.length === 0 ||
      !title?.trim() ||
      !status?.trim() ||
      !priority?.trim() ||
      checkList?.some((option) => {
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
    res
      .status(201)
      .json({ message: "Task created successfully", data: newTask });
  } catch (err) {
    next(err);
  }
};

exports.getAllStatusTask = async (req, res, next) => {
  try {
    const { filter } = req.query;

    let day = 7;
    if (filter === "today") {
      day = 1;
    } else if (filter === "month") {
      day = 30;
    } else {
      day = 7;
    }
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - day);

    const allStatusTask = await Task.find({
      $and: [
        {
          $or: [{ userId: req.userId }, { assignTo: req.email }],
        },
        { createdAt: { $gte: daysAgo } },
      ],
    }).sort({ createdAt: 1 });

    const user = await User.findOne({ _id: req.userId });
    if (!allStatusTask || !user) {
      res.status(404).json({ message: "tasks or user does not exist" });
      return;
    }

    res.status(200).json({
      message: "All tasks fetched successfully",
      data: allStatusTask,
      memberList: user.memberList || [],
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const taskTobeDeleted = await Task.findOne({ _id: taskId });
    if (!taskTobeDeleted) {
      res.status(404).json({ message: "Task not found" });
    }

    if (
      taskTobeDeleted.userId.toString() !== req.userId.toString() &&
      taskTobeDeleted.assignTo !== req.email
    ) {
      res.status(402).json({ message: "Unauthorized to delete" });
      return;
    }

    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    res.status(200).json({ message: "Task Deleted", data: deletedTask });
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      res.status(404).json({ message: "Task not  found" });
      return;
    }

    res.status(200).json({ message: "Task fetched successfully", data: task });
  } catch (err) {
    res.status(404).json({ message: "Task not found" });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

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
      assignTo,
    } = req.body;

    if (
      checkList?.length === 0 ||
      checkList?.some((option) => {
        return option?.checkText?.trim() === "";
      })
    ) {
      res.status(403).json({
        message: "Due date is optional and rest Fields are mandatory",
      });
      return;
    }

    const taskTobeUpdated = await Task.findOne({ _id: taskId });
    if (!taskTobeUpdated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    if (
      taskTobeUpdated.userId.toString() !== req.userId.toString() &&
      taskTobeUpdated.assignTo !== req.email
    ) {
      res.status(402).json({ message: "Unauthorized to update" });
      return;
    }

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

    taskTobeUpdated.userId = userId || taskTobeUpdated.userId;
    taskTobeUpdated.dueDate = dueDate || taskTobeUpdated.dueDate;
    taskTobeUpdated.assignTo = assignTo || taskTobeUpdated.assignTo;
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
  } catch (err) {
    next(err);
  }
};

exports.getTaskStatusCounts = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const allTasks = await Task.find({
      $or: [{ userId: userId }, { assignTo: req.email }],
    });

    let taskCounts = {
      high: 0,
      low: 0,
      moderate: 0,
      backlog: 0,
      progress: 0,
      todo: 0,
      done: 0,
      dueDate: 0,
    };
    allTasks?.map((task) => {
      taskCounts[task["priority"]] += 1;
      taskCounts[task["status"]] += 1;
      if (task?.dueDate) {
        taskCounts.dueDate = taskCounts.dueDate + 1;
      }
    });

    res.status(200).json({
      message: "counts fetched successfully",
      userId: userId,
      taskCountsObj: taskCounts,
    });
  } catch (err) {
    next(err);
  }
};
