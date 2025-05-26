import { useState } from "react";
import { Pencil, Save } from "lucide-react";
import LMSNavbar from "../components/LMSNavbar";
import { useContext } from "react";
import { StudentDataContext } from "../context/StudentContext";

export default function Profile() {
  const {student}=useContext(StudentDataContext)
  const dummyStudent = {
    fullName: student?.fullName.firstName +" "+ student?.fullName.lastName,
    email:student?.email,
    department: student?.department,
    enrollmentNo: student?.enrollmentNo,
    semester: student?.semester,
    section:student?.section,

  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...dummyStudent });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative w-screen h-screen">
      <LMSNavbar />
    <div className="absolute top-20 min-h-screen flex items-center justify-center bg-gray-100 p-6 w-full">
      <div className="w-full max-w-3xl bg-white shadow-md p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Profile</h2>
        
        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <label className="text-[#135106]/70 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-2/3 focus:ring focus:ring-indigo-300"
                />
              ) : (
                <span className="text-gray-800">{value}</span>
              )}
            </div>
          ))}
        </div>

        {/* <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-6 flex items-center gap-2 bg-[#135106]/90 text-white px-4 py-2 rounded-lg hover:bg-[#135106] focus:ring focus:ring-indigo-300"
        >
          {isEditing ? <Save size={18} /> : <Pencil size={18} />}
          {isEditing ? "Save" : "Edit Profile"}
        </button> */}
      </div>
    </div>
    </div>
  );
}
