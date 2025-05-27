import { React, useState } from "react";
import LMSNavbar from "../components/LMSNavbar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const CoursePage = () => {
  const [activeUnit, setActiveUnit] = useState(null);
  const location = useLocation();
  const allotments = location.state?.allotments || {};
  let rawUnits = [];

  if (allotments?.materials?.length > 0) {
    rawUnits = allotments.materials.map((a) => ({
      unit: a.unit,
      files: a.file,
    }));
  }

  // Create an array for 4 units even if some have no data
  const units = [1, 2, 3, 4].map((unitNum) => {
    const matched =
      rawUnits.length > 0 && rawUnits.find((u) => u.unit === unitNum);
    return {
      unit: unitNum,
      files: matched ? matched.files : [],
    };
  });

  return (
    <div className="relative w-screen h-screen">
      <LMSNavbar />
      <div className="absolute top-20 w-screen min-h-screen">
        <h1 className="p-5 text-2xl font-bold text-center">DCCN: BIT-304</h1>
        <div className="bg-[#135106]/40 sm:mx-7 sm:p-5 rounded-xl min-h-screen">
          <div className="p-4 mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full bg-white rounded-md overflow-hidden">
              {units.map((unit) => (
                <button
                  key={unit.unit}
                  className={`flex items-center justify-between px-4 py-3 text-black font-semibold transition duration-300 w-full border-b sm:border-r border-[#135106]/40 ${
                    activeUnit === unit.unit
                      ? "bg-[#135106]/95 text-white"
                      : "hover:bg-[#135106] hover:text-white"
                  }`}
                  onClick={() =>
                    setActiveUnit(activeUnit === unit.unit ? null : unit.unit)
                  }
                >
                  Unit {unit.unit}
                  {activeUnit === unit.unit ? (
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
              <h2 className="text-2xl font-bold mb-3">
                Materials for Unit {activeUnit}
              </h2>
              <div>
                <h3 className="text-green-700 pb-2 font-semibold">
                  Lecture Materials
                </h3>
                <ul className="list-disc pl-5 text-blue-700">
                  {units.find((u) => u.unit === activeUnit)?.files.length >
                  0 ? (
                    units
                      .find((u) => u.unit === activeUnit)
                      .files.map((file, index) => (
                        <li key={index} className="pb-2">
                          <a
                            href={`/view-pdf/${file.fileUrl.split("/").pop()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {file.fileName}
                          </a>
                        </li>
                      ))
                  ) : (
                    <li className="text-gray-500 italic">
                      No materials uploaded yet.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md  mx-auto w-[96%] sm:w-[98%]">
            <h2 className="text-xl font-bold text-green-800">
              Course Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-bold text-green-700">Instructor</h3>
                <p className="text-gray-800">
                  {allotments?.faculty?.fullName?.firstName}{" "}
                  {allotments?.faculty?.fullName?.lastName}
                </p>
                <p className="text-gray-600">{allotments?.faculty?.email}</p>
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
