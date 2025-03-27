import React from "react";
import LMSNavbar from "../components/LMSNavbar";
import SubjectCard from "../components/SubjectCard";

const MyCourses = () => {
  return (
    <div className="relative w-screen h-screen">
      <LMSNavbar />
      <div className="absolute top-20 w-screen min-h-screen">
        <h1 className="p-5 text-2xl font-bold text-center">Hey Kanishka 👋</h1>
        <div className="bg-[#135106]/40 sm:mx-7 sm:p-5 rounded-xl">
          {/* <h1>My Courses</h1> */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 sm:mt-0">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
