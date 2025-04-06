import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllotmentDashboard = () => {
  const navigate=useNavigate();
  const [faculty, setFaculty] = useState({
    fullName: { firstName: "", lastName: "" },
    email: "",
    department: "",
  });

  const [newAllotment, setNewAllotment] = useState({
    department: "",
    subject: "",
    section: "",
    semester: "",
  });

  const [allotments, setAllotments] = useState([]);
  const facultyId = localStorage.getItem("facultyId");

  useEffect(() => {
    if(!facultyId){
    navigate('/admin-dashboard');
    }
    async function fetchData() {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/faculty/get-faculty/${facultyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFaculty(res.data.faculty);
      //   console.log(res.data.faculty);
      setAllotments(res.data.faculty.allotedDepartments || []);
    }

    if (facultyId) fetchData();
  }, [faculty]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/faculty/update-faculty/${facultyId}`,
        faculty,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    alert("Faculty details updated!");
  };

  const handleAddAllotment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/allot-department/${facultyId}`,
        newAllotment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.allotments);
        setAllotments(response.data.allotments);}
    } catch (err) {
      console.log(err);
    }
    setNewAllotment({ department: "", subject: "", section: "", semester: "" });
  };

  const handleDeleteAllotment = async (allotmentId, index) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/admin/delete-allotment/${facultyId}/${allotmentId}`,
     
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const updated = [...allotments];
        updated.splice(index, 1);
        setAllotments(updated);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteFaculty = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this faculty?");
    if (!confirmed) return;
  
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/faculty/delete-faculty/${facultyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        localStorage.removeItem("facultyId");
        alert("Faculty deleted successfully.");
        navigate('/admin-dashboard');
      }
    } catch (err) {
      console.error("Error deleting faculty:", err);
      alert("Something went wrong while deleting the faculty.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700">
            Faculty Allotment Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your faculty profile and subject allotments
          </p>
        </div>

        {/* Faculty Info Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Update Faculty Information
          </h2>
          <form
            onSubmit={handleUpdateInfo}
            className="grid md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              placeholder="First Name"
              value={faculty.fullName.firstName}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  fullName: { ...faculty.fullName, firstName: e.target.value },
                })
              }
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={faculty.fullName.lastName}
              onChange={(e) =>
                setFaculty({
                  ...faculty,
                  fullName: { ...faculty.fullName, lastName: e.target.value },
                })
              }
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={faculty.email}
              onChange={(e) =>
                setFaculty({ ...faculty, email: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Department"
              value={faculty.department}
              onChange={(e) =>
                setFaculty({ ...faculty, department: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-md"
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition w-full md:w-auto"
              >
                Update Info
              </button>
              <button

                onClick={deleteFaculty}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition w-full md:w-auto"
              >
                Delete Faculty
              </button>
              
            </div>
          </form>
        </div>

        {/* Allotment Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Subject Allotment
          </h2>
          <form
            onSubmit={handleAddAllotment}
            className="grid md:grid-cols-4 gap-6"
          >
            <input
              type="text"
              placeholder="Department"
              value={newAllotment.department}
              onChange={(e) =>
                setNewAllotment({ ...newAllotment, department: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Subject"
              value={newAllotment.subject}
              onChange={(e) =>
                setNewAllotment({ ...newAllotment, subject: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Section"
              value={newAllotment.section}
              onChange={(e) =>
                setNewAllotment({ ...newAllotment, section: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Semester"
              value={newAllotment.semester}
              onChange={(e) =>
                setNewAllotment({ ...newAllotment, semester: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-md"
            />
            <div className="md:col-span-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition w-full md:w-auto"
              >
                Add Allotment
              </button>
            </div>
          </form>
        </div>

        {/* Allotment Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Current Allotments
          </h2>
          {allotments.length === 0 ? (
            <p className="text-gray-500">No allotments yet.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-indigo-100 text-gray-800">
                <tr>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Section</th>
                  <th className="p-3 text-left">Semester</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allotments.map((a, i) => (
                  
                  <tr key={i} className="hover:bg-gray-50 border-b transition">
                    <td className="p-3">{a.department}</td>
                    <td className="p-3">{a.subject}</td>
                    <td className="p-3">{a.section}</td>
                    <td className="p-3">{a.semester}</td>
                    
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteAllotment(a._id, i)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                      {/* Edit button can be added here */}
                    </td>
                  </tr>
               
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllotmentDashboard;
