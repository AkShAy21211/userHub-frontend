import { useState } from "react"
import {instance} from "../services/api"
import Alert from "../components/toast/Alert";

export const useLogin = () =>{

    const [errors,setErrors] = useState(null);
    const [loader,setLoader] = useState(false);


    const login = async (formData)=>{

        try{
       setLoader(true);
        setErrors(null);

        const response = await instance.post("/login",formData,{

            headers:{
                'Content-Type':"application/json"
            },
           
        });
        }catch(error){
       console.error("Error:", error);
      setLoader(false);
      if (error.response) {
        setErrors(error.response.data.message);
      } else {
        setErrors("An unexpected error occurred.");
      }


        }
      

    }

    return {login,loader,errors}

} 