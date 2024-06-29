import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../services/localStoage'

const ProtectedRoute = ({children}) => {
    const navigate=useNavigate()
    const {token,email,userId,userName}=getUserInfo()
    useEffect(()=>{
        if(!token || !email || !userId){
            navigate("/")
        }
    })
    if(!token || !email || !userId || !userName){
        return
    }else{
        return children
    }
  
}

export default ProtectedRoute
