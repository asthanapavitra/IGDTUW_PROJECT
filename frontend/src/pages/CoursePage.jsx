import { React, useState } from "react";
import LMSNavbar from "../components/LMSNavbar";
import { ChevronDown, ChevronUp } from "lucide-react";
const CoursePage = () => {
  const [activeUnit, setActiveUnit] = useState(null);

  const units = [
    {
      id: 1,
      title: "Unit 1",
      content: {
        title: "Introduction to Data Communication",
        lectureMaterials: [
          { name: "Introduction to Network Models", link: "#" },
          { name: "OSI Model Explained", link: "#" },
          { name: "TCP/IP Protocol Suite - Video Lecture", link: "#" },
        ],
        assignments: [
          {
            name: "Assignment 1: Network Analysis",
            due: "Oct 15",
            link: "#",
            important: true,
          },
          { name: "Supplementary Reading Materials", link: "#" },
          { name: "Useful Web Resources", link: "#" },
        ],
      },
    },
    {
      id: 2,
      title: "Unit 2",
      content: { title: "Content for Unit 2 goes here." },
    },
    {
      id: 3,
      title: "Unit 3",
      content: { title: "Content for Unit 3 goes here." },
    },
    {
      id: 4,
      title: "Unit 4",
      content: { title: "Content for Unit 4 goes here." },
    },
  ];
  return (
    <div className="relative w-screen h-screen">
      <LMSNavbar />
      <div className="absolute top-20 w-screen min-h-screen">
        <h1 className="p-5 text-2xl font-bold text-center">DCCN: BIT-304</h1>
        <div className="bg-[#135106]/40 sm:mx-7 sm:p-5 rounded-xl min-h-screen">
          <div className=" p-4 mx-auto w-full ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full bg-white rounded-md overflow-hidden">
              {units.map((unit) => (
                <button
                  key={unit.id}
                  className={`flex items-center justify-between px-4 py-3  text-black font-semibold transition duration-300 w-full border-b sm:border-r border-[#135106]/40 ${
                    activeUnit === unit.id
                      ? "bg-[#135106]/95 text-white"
                      : "hover:bg-[#135106] hover:text-white"
                  }`}
                  onClick={() =>
                    setActiveUnit(activeUnit === unit.id ? null : unit.id)
                  }
                >
                  {unit.title}
                  {activeUnit === unit.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeUnit !== null && (
            <div className="mt-5 bg-white p-5 rounded-lg shadow-lg min-h-60 mx-auto w-[96%] sm:w-[98%]">
              <h2 className="text-2xl font-bold mb-3">{units[activeUnit - 1].content.title}</h2>
              {units[activeUnit - 1].content.lectureMaterials && (
                <div>
                  <h3 className="text-green-700 pb-2 font-semibold">
                    Lecture Materials
                  </h3>
                  <ul className="list-disc pl-5 text-blue-700">
                    {units[activeUnit - 1].content.lectureMaterials.map(
                      (item, index) => (
                        <li key={index} className="pb-2">
                          <a href={item.link} className="hover:underline">
                            {item.name}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {units[activeUnit - 1].content.assignments && (
                <div className="mt-4">
                  <h3 className="text-green-700 pb-2 font-semibold">
                    Assignments & Resources
                  </h3>
                  <ul className="list-disc pl-5">
                    {units[activeUnit - 1].content.assignments.map(
                      (item, index) => (
                        <li key={index} className="pb-2">
                          <a
                            href={item.link}
                            className="hover:underline text-blue-700"
                          >
                            {item.name}
                          </a>
                          {item.important && (
                            <span className="text-red-500 ml-2">
                              Due: {item.due}
                            </span>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md  mx-auto w-[96%] sm:w-[98%]">
            <h2 className="text-xl font-bold text-green-800">
              Course Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-bold text-green-700">Instructor</h3>
                <p className="text-gray-800">Dr. Jane Smith</p>
                <p className="text-gray-600">jsmith@university.edu</p>
              </div>
              <div>
                <h3 className="font-bold text-green-700">Course Details</h3>
                <p className="text-gray-800">Credits: 4</p>
                <p className="text-gray-800">
                  Room: Engineering Building, Room 305
                </p>
                <p className="text-gray-800">Prerequisites: BIT-201, BIT-203</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
