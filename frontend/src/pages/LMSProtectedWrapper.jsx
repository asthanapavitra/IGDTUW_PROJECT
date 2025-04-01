import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import  { StudentDataContext } from "../context/StudentContext";
const LMSProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {setStudent}=useContext(StudentDataContext);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(async () => {
    
    if (!token) {
      navigate("/lms-login");
    }
    else{
      axios.get(`${import.meta.env.VITE_BASE_URL}/student/dashboard`,{
        headers:{
          Authorization: `Bearers ${token}`
        }
      })
      .then((response)=>{
        if(response.status==201){
          setStudent(response.data.student);
          setIsLoading(false)
          console.log("Student set")
        }
      })
      .catch((err)=>{
        console.log(err.response.data.error);
        localStorage.removeItem("token");
        setIsLoading(false)
        navigate('/lms-login');
      })
      
    }

  }, [token]);
  if(isLoading){
    return (
      <div>Loading...</div>
    )
  }
  return <div>{children}</div>;
};

export default LMSProtectedWrapper;