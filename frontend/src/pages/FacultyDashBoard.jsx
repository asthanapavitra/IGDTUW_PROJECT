import { BookOpen, User } from "lucide-react";

const dummyFaculty = {
  fullName: { firstName: "Ananya", lastName: "Sharma" },
  email: "ananya@igdtuw.ac.in",
  facultyId: "FAC123",
  department: "Computer Science",
  allotedDepartments: [
    {
      _id: "1",
      subject: "Data Structures",
      department: "CSE",
      section: "A",
      semester: "4",
      materials: [
        {
          unit: "Unit 1",
          file: ["Stacks.pdf", "Queues.pdf"],
        },
        {
          unit: "Unit 2",
          file: ["Trees.pdf"],
        },
      ],
    },
    {
      _id: "2",
      subject: "Operating Systems",
      department: "CSE",
      section: "B",
      semester: "6",
      materials: [],
    },
  ],
};

export default function FacultyDashboard({ onSelectAllotment }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
          👩‍🏫 Welcome, {dummyFaculty.fullName.firstName}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Faculty Info */}
          <div className="col-span-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40 transition hover:shadow-2xl">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-purple-900 mb-6">
              <User className="w-6 h-6" /> Faculty Info
            </h2>
            <div className="space-y-3 text-gray-700 text-base">
              <p><strong>Name:</strong> {dummyFaculty.fullName.firstName} {dummyFaculty.fullName.lastName}</p>
              <p><strong>Email:</strong> {dummyFaculty.email}</p>
              <p><strong>Faculty ID:</strong> {dummyFaculty.facultyId}</p>
              <p><strong>Department:</strong> {dummyFaculty.department}</p>
            </div>
          </div>

          {/* Allotments */}
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Allotments</h2>
            <div className="space-y-6">
              {dummyFaculty.allotedDepartments.map((allotment) => (
                <div
                  key={allotment._id}
                  className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-6 flex justify-between items-center transition hover:scale-[1.01] hover:shadow-xl flex-col sm:flex-row gap-5"
                >
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-indigo-900">
                      <BookOpen className="w-5 h-5" /> {allotment.subject}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Dept:</span> {allotment.department} &nbsp;|&nbsp;
                      <span className="font-medium">Section:</span> {allotment.section} &nbsp;|&nbsp;
                      <span className="font-medium">Semester:</span> {allotment.semester}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectAllotment(allotment)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-xl font-medium shadow-sm hover:shadow-lg transition"
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
