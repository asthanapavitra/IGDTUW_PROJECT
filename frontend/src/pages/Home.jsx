import React from "react";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="relative h-screen bg-[url('https://igdtuw.in/IGDTUW/resources/login/img/IGDTUW_Image.jpg')] bg-no-repeat bg-[length:100%_100%] md:bg-cover bg-center md:bg-fixed overflow-scroll">
      
      <div className="min-h-full w-full z-50 bg-black/70">
        <div className="pt-5 flex flex-col justify-center items-center gap-3">
          <img
            className="h-20 "
            src="https://igdtuw.in/IGDTUW/resources/login/img/IGDTUW_logo.png"
            alt="igit-logo"
          />
          <h1 className="text-slate-200 text-xl">Welcome</h1>
          <span className="text-slate-200 text-2xl font-bold text-center p-4">
            Indira Gandhi Delhi Technical University for Women
          </span>
          <a
            className="bg-[#135106] border-[#135106] border-2 px-3 py-1 text-sm text-emerald-100 rounded-lg hover:bg-transparent hover:text-white hover:border-white hover:border-2 hover:transform hover:transition hover:duration-300"
            href="https://www.igdtuw.ac.in/"
          >
            Visit official site
          </a>
        </div>
        <div className="flex justify-around items-center gap-6 p-6 flex-wrap mt-5">
          <Card
            user="student"
            desc="Stay connected with your academics, track attendance, and access essential resources"
          />
          <Card
            user="lms"
            desc="Explore a centralized hub for learning materials, lectures, and assessments"
          />
          <Card
            user="faculty"
            desc="Manage academic activities, monitor student progress, and streamline coursework"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
