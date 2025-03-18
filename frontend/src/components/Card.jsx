import React from "react";
import { Link } from "react-router-dom";

const Card = ({ user,desc}) => {
  
  return (
    <div className="border-amber-100 rounded-md bg-slate-300 w-[90%] sm:w-[30%] h-[300px] sm:h-[280px] opacity-70 flex flex-col justify-center items-center px-6 py-2 gap-3 hover:transform hover:transition hover:duration-800 hover:scale-103 backdrop-blur-md">
      <h3 className="mt-2">
      <i className={`ri-${user==='student'?'graduation-cap':user==='faculty'?'user-2':'book-3'}-fill text-6xl border-2 rounded-md p-3`}></i>
      </h3>
      <p className="mt-4 text-center">{desc}</p>
      <Link to={`/${user}-login`}>
        <button className="bg-[#135106] px-3 py-2 rounded-lg text-white text-sm hover:bg-black hover:transform hover:transition hover:duration-300 -mb-2">{user==='student'?'Student':user==='faculty'?'Faculty':'LMS'} Login</button>
      </Link>
    </div>
  );
};

export default Card; 
