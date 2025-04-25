import React, { useContext, useEffect, useState } from "react";
import LMSNavbar from "../components/LMSNavbar";
import SubjectCard from "../components/SubjectCard";
import { StudentDataContext } from "../context/StudentContext";
import axios from "axios";


const MyCourses = () => {
  const { student } = useContext(StudentDataContext);
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const fetch = async()=> {
      if (!student?.department || !student?.semester || !student?.section)
        return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/student/get-courses/${
            student.department
          }/${student.semester}/${student.section}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 200) {
          setCourses(res.data.subjects);
          console.log(res.data.subjects);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [student]);

  return (
    <div className="relative w-screen h-screen">
      <LMSNavbar />
      <div className="absolute top-20 w-screen min-h-screen">
        <h1 className="p-5 text-2xl font-bold text-center">Hey Kanishka 👋</h1>
        <div className="bg-[#135106]/40 sm:mx-7 sm:p-5 rounded-xl">
          {/* <h1>My Courses</h1> */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 sm:mt-0 ">
              {courses.map((course,idx)=>(
                <SubjectCard key={idx} course={course}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
