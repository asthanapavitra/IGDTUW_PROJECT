import React from "react";
import LMSNavbar from "../components/LMSNavbar";
import SubjectCard from "../components/SubjectCard";

const LMSDashboard = () => {
  return (
    <div className="relative">
      <LMSNavbar />
      <div className="absolute top-20">
        <div className="flex justify-center items-center">
          <SubjectCard/>
        </div>
      </div>
    </div>
  );
};

export default LMSDashboard;
