import React from 'react'
import { Link } from 'react-router-dom'


// {
//   "subject": "Data Communication and Computer Networks",
//   "subject_code": "BIT-301",
//   "allotments": [
//     {
//       "section": "2",
//       "faculty": {
//         "fullName": {
//           "firstName": "Rishika21",
//           "lastName": "Singh"
//         },
//         "_id": "67f3f519e53ffbd1cae27ccc",
//         "email": "rishika@igdtuw.ac.in",
//         "facultyId": "Rishika123",
//         "department": "CSE",
//         "allotedDepartments": [
//           "67f3f58ce53ffbd1cae284f2",
//           "67f3f6b0e53ffbd1cae28508"
//         ],
//         "__v": 2
//       },
//       "materials": [
//         {
//           "_id": "680bf8b6b869248451dc88fa",
//           "unit": 2,
//           "file": [
//             {
//               "_id": "680bf8b6b869248451dc88f7",
//               "fileName": "transport layer",
//               "unit": 2,
//               "faculty": "67f3f519e53ffbd1cae27ccc",
//               "subject": "Data Communication and Computer Networks",
//               "fileUrl": "/faculty/files/680bf8b6b869248451dc88f1",
//               "__v": 0
//             }
//           ],
//           "date": "2025-04-25T21:03:50.371Z",
//           "__v": 0
//         }
//       ]
//     }
//   ]
// },

const SubjectCard = ({course}) => {
  cons naviagte=useNavigate();

  return (
    <div className="cursor-pointer group relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-80 md:w-75 hover:shadow-lg transition-shadow duration-300">
  <div className="relative h-56 -mb-4 md:m-2.5 overflow-hidden text-white rounded-md">
    <img className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
         src="https://images.unsplash.com/photo-1496436818536-e239445d3327?q=80&w=1200" alt="investment-seed-round" />
  </div>
  <div className="px-4 py-2">
    <h6 className="mb-2 text-slate-800 text-xl font-semibold">
      {course.subject}
    </h6>
    <p className="text-slate-600 leading-normal font-light">
      
      {course.subject_code}
      <br />
     {course.allotments?.[0]?.faculty?.fullName?.firstName} {course.allotments?.[0]?.faculty?.fullName?.lastName}

    </p>
  </div>
  <div className="px-4 pb-6 pt-0 mt-2">
    <button className="rounded-md bg-slate-800 py-2.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={()=>{navigate("/add-materials", { state: { allotment } })}}>
      View Details
    </button>
  </div>
</div> 
  )
}

export default SubjectCard
