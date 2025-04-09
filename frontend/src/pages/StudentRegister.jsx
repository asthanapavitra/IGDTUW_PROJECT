import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentRegister = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = {
      enrollmentNo,
      password,
      email,
      fullName: { firstName, lastName },
      department,
      semester,
      securityQuestion: { question, answer },
    };

    // console.log(student);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/student/register`,
        student,
        
      );

      if (res.status === 201) {
        navigate("/lms-login");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="relative h-screen bg-[url('https://d2lk14jtvqry1q.cloudfront.net/media/slider21_139d43fffb.png')] bg-no-repeat bg-[length:100%_100%] md:bg-cover bg-center md:bg-fixed overflow-hidden">
      <div className="min-h-full w-full z-50 bg-black/70">
        <div className="h-screen flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            action=""
            className="bg-white/90 m-4 p-8 flex flex-col justify-center items-center rounded-lg gap-5 w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%]"
          >
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-800">
                Student Register
              </h3>
              <img
                src="https://igdtuw.in/IGDTUW/resources/login/img/IGDTUW_logo.png"
                alt=""
                className="h-20"
              />
            </div>
            <div className="flex justify-between w-full">
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              />
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              />
            </div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-full"
            />

            <div className="flex justify-between w-full">
              <input
                type="text"
                value={enrollmentNo}
                placeholder="Enrollment no."
                onChange={(e) => setEnrollmentNo(e.target.value)}
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              />
            </div>

            <div className="flex justify-between w-full">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              >
                <option value="">Select Department</option>{" "}
                <option value="CSE">CSE</option>
                <option value="MAE">MAE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="AI">AI</option>
                <option value="CSE-AI">CSE-AI</option>
                <option value="ECE-AI">ECE-AI</option>
                <option value="AI-ML">AI-ML</option>
              </select>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)} // ✅ Correct way
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              >
                <option value="">Select Semester</option>{" "}
                {/* ✅ Optional: Default option */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>

            <div className="flex justify-between w-full">
              <select
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              >
                <option value="">Select Question</option>{" "}
                <option value="What is the name of your best childhood friend?">
                  What is the name of your best childhood friend?
                </option>
                <option value="What is your favorite color?">
                  What is your favorite color?
                </option>
                <option value="What was the name of your first school?">
                  What was the name of your first school?
                </option>
                <option value="What is your favorite food?">
                  What is your favorite food?
                </option>
                <option value="What is your dream job?">
                  What is your dream job?
                </option>
              </select>

              <input
                type="text"
                value={answer}
                placeholder="Answer"
                onChange={(e) => setAnswer(e.target.value)}
                className="bg-emerald-800/10 px-2 py-1 outline-0 border-2 rounded-md border-[#135106] text-sm placeholder:text-emerald-900/50 w-[49%]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#135106] rounded-3xl w-[100%] py-2 text-white text-sm mt-2 hover:bg-[#22850f] sm:w-[60%]"
            >
              Register
            </button>
            <div className="flex gap-2 text-sm">
              <p>Already have an account ? </p>
              <Link to="/" className="text-emerald-900 underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
