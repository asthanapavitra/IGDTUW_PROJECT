import { BookOpen, User } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { FacultyDataContext } from "../context/FacultyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const { faculty } = useContext(FacultyDataContext);
  const [allotments, setAllotments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllotments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/faculty/${faculty._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setAllotments(res.data.faculty.allotedDepartments);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAllotments();
  }, [faculty]);

  const onSelectAllotment = (allotment) => {
    navigate("/add-materials", { state: { allotment } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
          👩‍🏫 Welcome, {faculty.fullName.firstName}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Faculty Info */}
          <div className="col-span-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40 transition hover:shadow-2xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-purple-900 mb-6">
              <User className="w-6 h-6" /> Faculty Info
            </h2>
            <div className="space-y-3 text-gray-700 text-base">
              <p>
                <strong>Name:</strong> {faculty.fullName.firstName}{" "}
                {faculty.fullName.lastName}
              </p>
              <p>
                <strong>Email:</strong> {faculty.email}
              </p>
              <p>
                <strong>Faculty ID:</strong> {faculty.facultyId}
              </p>
              <p>
                <strong>Department:</strong> {faculty.department}
              </p>
            </div>
          </div>

          {/* Allotments */}
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Your Allotments
            </h2>
            <div className="space-y-6">
              {allotments.map((allotment) => (
                <div
                  key={allotment._id}
                  className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-6 flex justify-between items-center transition hover:scale-[1.01] hover:shadow-xl flex-col sm:flex-row gap-5"
                >
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-indigo-900">
                      <BookOpen className="w-5 h-5" /> {allotment.subject}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Dept:</span>{" "}
                      {allotment.department} &nbsp;|&nbsp;
                      <span className="font-medium">Section:</span>{" "}
                      {allotment.section} &nbsp;|&nbsp;
                      <span className="font-medium">Semester:</span>{" "}
                      {allotment.semester}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectAllotment(allotment)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-xl font-medium shadow-sm hover:shadow-lg transition cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
