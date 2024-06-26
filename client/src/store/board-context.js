import React from 'react'
const BoardContext=React.createContext({
    allTasks:[],
    todoTasks:[],
    backlogTasks:[],
    progressTasks:[],
    doneTasks:[],
    addTask:()=>{},
    addTocombinedTasks:()=>{},
    removeTask:()=>{},
    updateTaskStatus:()=>{}
    
})

export default BoardContext