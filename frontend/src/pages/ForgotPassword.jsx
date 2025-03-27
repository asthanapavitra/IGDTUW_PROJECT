import React, { useState, useEffect, useRef, useContext } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { StudentDataContext } from "../context/StudentContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate=useNavigate();
  const [step, setStep] = useState(0);
  const emailRef = useRef(null);
  const questionRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { student, setStudent } = useContext(StudentDataContext);

  const handleEmail = async () => {
  
    try{
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/update-password/check-email`,{
            email,
            user:'student'
        });
        if(res.status===200){
          setStep(1);
          setStudent(res.data.user);
          console.log(student);
        }
        
    }catch(err){
      alert("Invalid Credentials");
    }
  };
  const handleQuestion = async() => {
    if(answer.toLowerCase()==student.securityQuestion.answer.toLowerCase()){
      setStep(2);
    }
    else{
      alert("Incorrect answer");
    }
    
  };
  const updatePassword=async()=>{

    try{
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/update-password/new-password`,{
        email,
        user:"student",
        newPassword
      })
      if(res.status==200){
        alert("Password updated successfully ");
        navigate('/lms-login');
      }
    }
    catch(err){
      alert("Something went wrong ,try again");
    }
  }
  useGSAP(() => {
    if (step == 1) {
      gsap.to(emailRef.current, {
        translateX: "110%",
        duration: 1,
      });
      gsap.to(questionRef.current, {
        translateX: "0%",
        duration: 1,
        opacity:1,
      });
    } else if (step == 2) {
      gsap.to(emailRef.current, {
        translateX: "220%",
        duration: 1,
      });
      gsap.to(questionRef.current, {
        translateX: "110%",
        duration: 1,
      });
      gsap.to(passwordRef.current, {
        translateX: "0%",
        duration: 1,
        opacity:1,
      });
    }
  }, [step]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#1E7D32]">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-white font-bold text-xl mb-1">Forgot Password?</h1>
        <div className=" top-0 w-[300px] h-[80px] bg-white relative overflow-x-hidden rounded-md flex flex-col justify-center items-center gap-3">
          <div
            ref={passwordRef}
            className="bg-white px-3 py-3 flex justify-center items-center rounded-md -translate-x-[220%] opacity-0"
          >
            <div className="flex gap-3 justify-center items-center ">
              <input
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter new password"
                className="bg-emerald-800/10  px-2 py-2 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-full"
              />
              <button onClick={()=>{
                updatePassword();
              }} className="rounded-md p-1 hover:text-green-500">
                <i className="ri-arrow-right-line text-2xl"></i>
              </button>
            </div>
          </div>
          <div
            ref={questionRef}
            className="absolute top-0 opacity-0 h-full w-full  bg-white px-5 py-3 rounded-md -translate-x-[110%] flex  flex-col justify-center gap-1 "
          >
            <h3 className=" tracking-tighter text-sm font-mono ml-2 ">
              {student && student.securityQuestion.question}
            </h3>
            <div className="flex gap-2 justify-center items-center">
              <input
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                type="text"
                placeholder="Enter answer"
                className="bg-emerald-800/10  px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-full"
              />
              <button
                onClick={() => {
                  handleQuestion();
                }}
                className="rounded-md p-1 hover:text-green-500"
              >
                <i className="ri-arrow-right-line text-2xl"></i>
              </button>
            </div>
          </div>
          <div
            ref={emailRef}
            className="absolute top-3 bg-white px-3 py-3 rounded-md flex justify-center gap-2 w-full"
          >
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Enter your email"
              className="bg-emerald-800/10 px-2 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[100%]"
            />
            <button
              onClick={() => {
                handleEmail();
              }}
              className="rounded-md p-1 hover:text-green-500"
            >
              <i className="ri-arrow-right-line text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
