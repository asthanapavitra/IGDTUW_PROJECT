import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllotmentDashboard from "./AllotmentDashboard";

const AdminDashboard = () => {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    facultyId: "",
    password: "",
    department: "",
  });

  useEffect(() => {
    const fetchFac = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/faculty/get-all-faculty`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status == 200) {
          setFaculties(res.data.faculties);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFac();
  }, [faculties]);

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/faculty/create-faculty`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 201) {
        setFaculties([...faculties, res.data.faculty]);
        setFormData({
          fullName: {
            firstName: "",
            lastName: "",
          },
          email: "",
          facultyId: "",
          password: "",
          department: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goToAllotment = (id)=>{
    localStorage.setItem("facultyId",id);
    navigate('/allotment-dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          🧑‍💼 Admin Dashboard - Faculty Manager
        </h1>

        {/* Add Faculty Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
            Add Faculty
          </h2>
          <form
            onSubmit={handleAddFaculty}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="First Name"
              className="input"
              value={formData.fullName.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: {
                    ...formData.fullName,
                    firstName: e.target.value,
                  },
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input"
              value={formData.fullName.lastName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: {
                    ...formData.fullName,
                    lastName: e.target.value,
                  },
                })
              }
            />
            <input
              type="email"
              placeholder="Email (e.g. user@igdtuw.ac.in)"
              className="input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Faculty ID"
              className="input"
              value={formData.facultyId}
              onChange={(e) =>
                setFormData({ ...formData, facultyId: e.target.value })
              }
              required
            />
            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className=""
            >
              <option value="">Select Department</option>{" "}
              <option value="CSE">CSE</option>
              <option value="MAE">MAE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="AI">AI</option>
              <option value="CSE-AI">CSE-AI</option>
              <option value="ECE-AI">ECE-AI</option>
              <option value="AI-ML">AI-ML</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-2"
            >
              Add Faculty
            </button>
          </form>
        </div>

        {/* Faculty List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
            Faculty List
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Faculty ID</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border">Allotments</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((f, id) => (
                  <tr key={id} className="text-center">
                    <td className="border px-4 py-2">
                      {f.fullName.firstName} {f.fullName.lastName}
                    </td>
                    <td className="border px-4 py-2">{f.email}</td>
                    <td className="border px-4 py-2">{f.facultyId}</td>
                    <td className="border px-4 py-2">{f.department}</td>
                    <td className="border px-4 py-2">
                      {f.allotedDepartments.map((a, i) => (
                        <div key={i} className="text-sm text-gray-600">
                          {a.subject} - {a.department} (Sem {a.semester}, Sec{" "}
                          {a.section})
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => goToAllotment(f._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Allotment Form */}
        {/* {selectedFacultyId && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              Add Allotment
            </h3>
            <form
              onSubmit={handleAllotmentSubmit}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <input
                type="text"
                placeholder="Department"
                className="input"
                value={allotData.department}
                onChange={(e) =>
                  setAllotData({ ...allotData, department: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="input"
                value={allotData.subject}
                onChange={(e) =>
                  setAllotData({ ...allotData, subject: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Section"
                className="input"
                value={allotData.section}
                onChange={(e) =>
                  setAllotData({ ...allotData, section: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Semester"
                className="input"
                value={allotData.semester}
                onChange={(e) =>
                  setAllotData({ ...allotData, semester: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-full"
              >
                Submit Allotment
              </button>
            </form>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AdminDashboard;
