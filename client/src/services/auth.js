import axios from "axios"
import { DOMAIN } from "../constant"

const registerUser=async(userDetails)=>{
    try{
        console.log('userDet',userDetails)
        const result=await axios.post(`${DOMAIN}/auth/register`,userDetails)
        return result.response

    }catch(err){
        return err.response
    }
}

export {registerUser}