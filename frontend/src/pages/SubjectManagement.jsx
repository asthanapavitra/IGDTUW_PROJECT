import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const SubjectManagement = () => {
  const dummySubjects = [
    { _id: "sub1", name: "Data Structures", subject_code: "CS10101" },
    { _id: "sub2", name: "Mathematics I", subject_code: "MA10102" },
    { _id: "sub3", name: "Algorithms", subject_code: "CS10203" },
    { _id: "sub4", name: "Circuits", subject_code: "EE10104" },
  ];

  const dummySemesters = [
    { _id: "sem1", semNo: 1, subjects: ["sub1", "sub2"] },
    { _id: "sem2", semNo: 2, subjects: ["sub3"] },
    { _id: "sem3", semNo: 1, subjects: ["sub4"] },
  ];

  const dummyDepartments = [
    { _id: "dept1", deptName: "Computer Science", semesters: ["sem1", "sem2"] },
    { _id: "dept2", deptName: "Electrical Engineering", semesters: ["sem3"] },
  ];

  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newSubject, setNewSubject] = useState({ name: "", subject_code: "" });

  useEffect(() => {
    setDepartments(dummyDepartments);
  }, []);

  useEffect(() => {
    if (selectedDept) {
      const dept = dummyDepartments.find((d) => d._id === selectedDept);
      setSemesters(dummySemesters.filter((sem) => dept?.semesters.includes(sem._id)));
    }
  }, [selectedDept]);

  useEffect(() => {
    if (selectedSem) {
      const sem = dummySemesters.find((s) => s._id === selectedSem);
      const subs = dummySubjects.filter((s) => sem?.subjects.includes(s._id));
      setSubjects(subs);
      setFilteredSubjects(subs);
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

  const handleAddSubject = () => {
    const newSub = {
      _id: `sub${Date.now()}`,
      name: newSubject.name,
      subject_code: newSubject.subject_code,
    };
    const updated = [...subjects, newSub];
    setSubjects(updated);
    setFilteredSubjects(updated);
    setNewSubject({ name: "", subject_code: "" });
  };

  const handleDelete = (id) => {
    const updated = subjects.filter((s) => s._id !== id);
    setSubjects(updated);
    setFilteredSubjects(updated);
  };

  const handleEdit = (id, updatedSubj) => {
    const updated = subjects.map((s) => (s._id === id ? { ...s, ...updatedSubj } : s));
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
              <option key={dept._id} value={dept._id}>
                {dept.deptName}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedSem(e.target.value)}
            className="p-3 border rounded-lg w-full md:w-1/2 bg-white shadow-sm"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem._id} value={sem._id}>
                Semester {sem.semNo}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Add New Subject</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="p-3 border rounded-lg w-full md:w-1/3 shadow-sm"
            />
            <input
              placeholder="Subject Code"
              value={newSubject.subject_code}
              onChange={(e) => setNewSubject({ ...newSubject, subject_code: e.target.value })}
              className="p-3 border rounded-lg w-full md:w-1/3 shadow-sm"
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
          <h3 className="text-xl font-semibold text-indigo-700">Subject List</h3>
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
                <h3 className="text-lg font-semibold text-indigo-800">{subj.name}</h3>
                <div className="flex gap-2">
                  <button
                    className="text-gray-600 hover:text-indigo-600"
                    onClick={() => {
                      const updatedName = prompt("Edit subject name:", subj.name);
                      const updatedCode = prompt("Edit subject code:", subj.subject_code);
                      if (updatedName && updatedCode) {
                        handleEdit(subj._id, {
                          name: updatedName,
                          subject_code: updatedCode,
                        });
                      }
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(subj._id)}
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