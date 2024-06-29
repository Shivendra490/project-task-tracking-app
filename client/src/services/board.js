import axios from "axios"
import { getUserInfo } from "./localStoage"
import { DOMAIN } from "../constant"

const addMember=async(memberEmail)=>{
    const {token}=getUserInfo()
    // console.log('check token',token)
    try{
        const headers={
            authorization:token,
            "Content-Type":"application/json"
        }
        const response=axios.post(`${DOMAIN}/board/add-member`,{memberEmail},{headers})
        return response
    }catch(err){
        return err.response
    }
}



const getUserDetails=async()=>{
    const {token,userId}=getUserInfo()
  
    try{
        const headers={
            authorization:token,
            "Content-Type":"application/json"
        }
        const response=axios.get(`${DOMAIN}/board/get-user/${userId}`,{headers})
        return response
    }catch(err){
        return err.response
    }
}


const updateUserDetails=async(user)=>{
    const {token,userId}=getUserInfo()
    // console.log('check bbbbbbbb token',task)
    try{
        const headers={
            authorization:token,
            "Content-Type":"application/json"
        }
        const response=axios.patch(`${DOMAIN}/board/update-user/${userId}`,user,{headers})
        return response
    }catch(err){
        return err.response
    }
}

export {addMember,getUserDetails,updateUserDetails}