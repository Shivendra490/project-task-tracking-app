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

export {addMember}