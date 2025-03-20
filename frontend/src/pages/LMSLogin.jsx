import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StudentDataContext } from "../context/StudentContext";

const LMSLogin = () => {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [password, setPassword] = useState("");
  const { student, setStudent } = useContext(StudentDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/student/login`,
        {
          enrollmentNo,
          password,
        }
      );
    
      if (res.status == 201) {
        localStorage.setItem("token",res.data.token);
        setStudent(res.data.student);
        navigate("/lms-dashboard");
      }
    } catch (err) {
      console.log(err.message);
    }
    setEnrollmentNo("");
    setPassword("");
  };
  return (
    <div className="relative h-screen bg-[url('https://d2lk14jtvqry1q.cloudfront.net/media/slider21_139d43fffb.png')] bg-no-repeat bg-[length:100%_100%] md:bg-cover bg-center md:bg-fixed overflow-hidden">
      <div className="min-h-full w-full z-50 bg-black/70">
        <div className="h-screen flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            action=""
            className="bg-white/80 m-4 p-8 flex flex-col justify-center items-center rounded-lg gap-5"
          >
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-800">LMS Login</h3>
              <img
                src="https://igdtuw.in/IGDTUW/resources/login/img/IGDTUW_logo.png"
                alt=""
                className="h-20"
              />
            </div>
            <input
              type="text"
              value={enrollmentNo}
              placeholder="Enrollment no."
              onChange={(e) => setEnrollmentNo(e.target.value)}
              className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-xl placeholder:text-emerald-900/50"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-xl placeholder:text-emerald-900/50"
            />
            <button
              type="submit"
              className="bg-[#135106] rounded-3xl px-26 py-1 text-white text-xl mt-2 hover:bg-[#22850f]"
            >
              Login
            </button>
            <div className="flex gap-2 text-sm">
              <p>Don't have an account ?</p>
              <Link to="/lms-register" className="text-emerald-900 underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LMSLogin;
