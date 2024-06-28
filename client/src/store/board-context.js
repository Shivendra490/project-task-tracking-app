import React from 'react'
const BoardContext=React.createContext({
    allTask:[],
    replaceAllTask:()=>{},
    addTask:()=>{},
    removeTask:()=>{},
    editTask:()=>{}
    
})

export default BoardContext




// todoTasks:[],
//     backlogTasks:[],
//     progressTasks:[],
//     doneTasks:[],