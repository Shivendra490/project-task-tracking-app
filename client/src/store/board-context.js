import React from 'react'
const BoardContext=React.createContext({
    allTask:[],
    replaceAllTask:()=>{},
    addTask:()=>{},
    removeTask:()=>{},
    updateTaskStatus:()=>{}
    
})

export default BoardContext




// todoTasks:[],
//     backlogTasks:[],
//     progressTasks:[],
//     doneTasks:[],