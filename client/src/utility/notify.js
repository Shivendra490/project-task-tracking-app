import {  toast } from 'react-toastify';

const notify = (message,status="success") => {
   if(status==="error"){
    toast.error(message)
   }else if(status==="info"){
    toast.info(message)
   }else{
    toast.success(message)
   }
}

export {notify}