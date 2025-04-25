import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";

const SubjectManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [allSubjects, setAllSubjects] = useState([]);
  const [semesters, setSemesters] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSubject, setNewSubject] = useState({ name: "", subject_code: "" });

  useEffect(() => {
    const fetchDep = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/subject/all-departments`
      );
      if (res.status == 200) {
        setDepartments(res.data.departments);
        // console.log(res.data);
      }
    };
    fetchDep();

    const fetchSubjects = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/subject/all-subjects`
      );
      if (res.status == 200) {
        setAllSubjects(res.data.subjects);
        // console.log(res.data);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/subject/get-subjects/${selectedDept}/${selectedSem}`
      );

      if (res.status == 200) {
        setSubjects(res.data.subjects);
        setFilteredSubjects(res.data.subjects);

        // console.log(res.data.subjects);
      }
    };
    // console.log(selectedDept, selectedSem);
    if (selectedDept != null && selectedSem != null) {
      fetch();
    }
  }, [selectedSem]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilteredSubjects(
      subjects.filter((subj) =>
        subj.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  const handleAddSubject = async () => {
    const res = await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/admin/add-subject-to-semester/${selectedSem}/${selectedDept}`,
      { subject_code: newSubject.subject_code },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status == 200) {
      // console.log(res.data.subjects);
      setSubjects(res.data.subjects);
      setFilteredSubjects(res.data.subjects);
    }

    setNewSubject({ name: "", subject_code: "" });
  };

  const handleDelete = async (subject_code, id) => {
    await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/admin/delete-subject-to-semester/${selectedSem}/${selectedDept}`,
      { subject_code },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const updated = subjects.filter((s) => s._id !== id);
    setSubjects(updated);
    setFilteredSubjects(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
          📚 Subject Management Dashboard
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            onChange={(e) => setSelectedDept(e.target.value)}
            className="p-3 border rounded-lg w-full md:w-1/2 bg-white shadow-sm"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.deptName}>
                {dept.deptName}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedSem(e.target.value)}
            className="p-3 border rounded-lg w-full md:w-1/2 bg-white shadow-sm"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem, idx) => (
              <option key={idx} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Add New Subject
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-4 relative">
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder="Select Subject"
                value={newSubject.name}
                onChange={(e) => {
                  setNewSubject({ name: e.target.value, subject_code: "" });
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="p-3 border rounded-lg w-full shadow-sm"
              />
              {showSuggestions && (
                <div className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-md">
                  {allSubjects
                    .filter((subject) =>
                      subject.name
                        .toLowerCase()
                        .includes(newSubject.name.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((subject) => (
                      <div
                        key={subject.subject_code}
                        onClick={() =>
                          setNewSubject({
                            name: subject.name,
                            subject_code: subject.subject_code,
                          })
                        }
                        className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                      >
                        {subject.name}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <input
              placeholder="Subject Code"
              value={newSubject.subject_code}
              readOnly
              className="p-3 border rounded-lg w-full md:w-1/3 shadow-sm bg-gray-100"
            />

            <button
              onClick={handleAddSubject}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-indigo-700">
            Subject List
          </h3>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded-lg shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubjects.map((subj) => (
            <div key={subj._id} className="rounded-2xl shadow-md p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-indigo-800">
                  {subj.name}
                </h3>
                <div className="flex gap-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(subj.subject_code, subj._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">Code: {subj.subject_code}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;
