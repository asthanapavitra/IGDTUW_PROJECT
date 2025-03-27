import React, { useState } from "react";
import { Link } from "react-router-dom";

const LMSNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#135106] w-screen h-20 flex fixed top-0 z-40">
      <div className="flex justify-between items-center w-full px-3 mr-5 text-white">
        <div className="flex justify-center items-center gap-2">
          <img
            className="h-14 bg-white rounded-lg my-3"
            src="https://igdtuw.in/IGDTUW/resources/login/img/IGDTUW_logo.png"
            alt=""
          />
          <h1 className="font-bold text-3xl">IGDTUW</h1>
        </div>
        <div className="hidden md:flex">
          <ul className="flex justify-between items-center gap-6">
            <li><Link to='/lms-dashboard'>Dashboard</Link></li>
            <li><Link to='/my-courses'>My Courses</Link></li>
            <li>Assignments</li>
          </ul>
        </div>
        <div className="hidden md:block">
          <div><Link to='/profile'>Profile</Link></div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white hover:bg-white/20 p-1 rounded-sm cursor-pointer">
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#135106] mt-1 text-white flex flex-col items-center py-4 md:hidden">
          <ul className="flex flex-col items-center gap-2">
          <li className="hover:bg-white/20 px-3 py-1 rounded"><Link to='/lms-dashboard'>Dashboard</Link></li>
            <li className="hover:bg-white/20 px-3 py-1 rounded"><Link to='/my-courses'>My Courses</Link></li>
            <li className="hover:bg-white/20 px-3 py-1 rounded">Assignments</li>
            <li className="hover:bg-white/20 px-3 py-1 rounded"><Link to='/profile'>Profile</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LMSNavbar;
