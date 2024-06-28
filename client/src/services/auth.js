import axios from "axios"
import { DOMAIN } from "../constant"

const registerUser=async(userDetails)=>{
    try{
        
        const response=await axios.post(`${DOMAIN}/auth/register`,userDetails)
        return response

    }catch(err){
        return err.response
    }
}

const loginUser=async(userDetails)=>{
    try{
        console.log('userDet',userDetails)
        const response=await axios.post(`${DOMAIN}/auth/login`,userDetails)
        console.log('RES',response)
        return response

    }catch(err){
        console.log('errRES',err.response)
        return err.response
    }
}





export {registerUser,loginUser}