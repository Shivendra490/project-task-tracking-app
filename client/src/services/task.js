import axios from "axios"
import {DOMAIN} from "../constant"
import { getUserInfo } from "./localStoage"
const createTask=async(task)=>{
    const {token}=getUserInfo()
    console.log('check token',token)
    try{
        const headers={
            authorization:token,
            "Content-Type":"application/json"
        }
        const response=axios.post(`${DOMAIN}/task/create-task`,task,{headers})
        return response
    }catch(err){
        return err.response
    }
}

const fetchAllStatusTask=async()=>{
    const {token}=getUserInfo()
  
    try{
        const headers={
            authorization:token,
            "Content-Type":"application/json"
        }
        const response=axios.get(`${DOMAIN}/task/all-status-task`,{headers})
        return response
    }catch(err){
        return err.response
    }
}


const deleteTask=async(taskId)=>{
    const {token}=getUserInfo()
  
    try{
        const headers={
            authorization:token,
            "Content-Type":"application/json"
        }
        const response=axios.delete(`${DOMAIN}/task/delete-task/${taskId}`,{headers})
        return response
    }catch(err){
        return err.response
    }
}

export {createTask,fetchAllStatusTask,deleteTask} 