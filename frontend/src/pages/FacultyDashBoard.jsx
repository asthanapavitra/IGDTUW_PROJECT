// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const FacultyDashboard = () => {
//   const {faculty}=useContext(FacultyDataContent);
//   // const [faculty, setFaculty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFacultyData = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/faculty/get-faculty/${facultyId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         ); 
//         setFaculty(res.data);
//       } catch (err) {
//         console.error("Error fetching faculty data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFacultyData();
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!faculty)
//     return (
//       <div className="text-center mt-10 text-red-500">
//         Unable to load faculty data.
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Faculty Details */}
//       <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700">
//           Welcome, {faculty.fullName.firstName} {faculty.fullName.lastName}
//         </h2>
//         <p className="text-gray-600 mt-2">Email: {faculty.email}</p>
//         <p className="text-gray-600">Faculty ID: {faculty.facultyId}</p>
//         <p className="text-gray-600">Department: {faculty.department}</p>
//       </div>

//       {/* Allotments Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">Subject</th>
//               <th className="py-3 px-4 text-left">Semester</th>
//               <th className="py-3 px-4 text-left">Section</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {faculty.allotedDepartments?.map((allotment) => (
//               <tr key={allotment._id} className="border-t hover:bg-gray-50">
//                 <td className="py-3 px-4">{allotment.subject}</td>
//                 <td className="py-3 px-4">{allotment.semester}</td>
//                 <td className="py-3 px-4">{allotment.section}</td>
//                 <td className="py-3 px-4">
//                   <button
//                     onClick={() => navigate(`/allotment/${allotment._id}`)}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//                   >
//                     Update
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {faculty.allotedDepartments?.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   No allotments found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FacultyDashboard;
