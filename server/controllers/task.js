const Task=require("../models/task")
exports.createTask = async (req, res, next) => {
  try {
    const { title, status, priority, checkList, dueDate } = req.body;
    console.log(req.body);

    if (
      checkList?.length===0 || 
      !title?.trim() ||
      !status?.trim() ||
      !priority?.trim() ||
      checkList?.some((option) =>{console.log(option);
        return option?.checkText?.trim() === ""}
      )
    ) {
      res.status(403).json({ message: "All Fields and atleast one checklist option are mandatory" });
      return;
    }

    const task=new Task({
      title,
      status,
      priority,
      checkList,
      userId:req.userId,
      dueDate
    })

    const newTask=await task.save()
    res.status(201).json({ message: "All Fields are valid" ,data:newTask});
      
  } catch (err) {}
};


exports.getAllStatusTask = async (req, res, next) => {
  try {
    
    console.log('getAllstatustask',req.headers);

    const allStatusTask=await Task.find({userId:req.userId})
    const todoList=[]
    const backlogList=[]
    const progressList=[]
    const doneList=[]
    allStatusTask?.forEach((task)=>{
      if(task.status==="todo"){
        todoList.push(task)
      }
      else if(task.status==="backlog"){
        backlogList.push(task)
      }
      else if(task.status==="progress"){
        progressList.push(task)
      }
      else{
        doneList.push(task)
      }
    })
    console.log('all',todoList,backlogList,progressList,doneList)

    res.status(200).json({ message: "All tasks fetched successfully" ,todoList,backlogList,progressList,doneList});
      
  } catch (err) {}
};

