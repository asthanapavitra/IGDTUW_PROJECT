import React, { useState } from "react";
import { ArrowLeft, Trash2, UploadCloud } from "lucide-react";

export default function AddMaterial({
  allotment = { subject: "Sample Subject", materials: [
    {
      unit: "Unit 1",
      file: ["Introduction.pdf", "Lecture1_Slides.pptx"],
    },
    {
      unit: "Unit 2",
      file: ["Process_Scheduling.pdf"],
    },
    {
      unit: "Unit 4",
      file: ["Memory_Management_Notes.pdf", "Extra_Reading.docx"],
    },
  ], },
  onBack = () => {},
}) {
  const [selectedUnit, setSelectedUnit] = useState("Unit 1");
  const [newFile, setNewFile] = useState("");

  const handleUpload = () => {
    alert(`Uploading ${newFile} to ${selectedUnit}`);
    setNewFile("");
  };

  const handleDelete = (fileName) => {
    alert(`Deleting ${fileName}`);
  };

  const units = ["Unit 1", "Unit 2", "Unit 3", "Unit 4"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Upload Materials – <span className="text-purple-700">{allotment.subject}</span>
        </h1>

        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/40 mb-10">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">📚 Select Unit:</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              📤 Upload Material (File Name):
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newFile}
                onChange={(e) => setNewFile(e.target.value)}
                placeholder="e.g., LectureNotes.pdf"
                className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={handleUpload}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg self-end"
              >
                <UploadCloud className="w-5 h-5" /> Upload
              </button>
            </div>
          </div>
        </div>

        {/* Uploaded Materials */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📂 Uploaded Materials</h2>
        <div className="space-y-6">
          {units.map((unit) => (
            <div
              key={unit}
              className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl p-5 shadow-sm"
            >
              <h3 className="text-lg font-bold text-indigo-700 mb-3">{unit}</h3>
              <ul className="space-y-2">
                {allotment.materials.find((m) => m.unit === unit)?.file?.length > 0 ? (
                  allotment.materials
                    .find((m) => m.unit === unit)
                    ?.file?.map((f, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 shadow-sm hover:shadow-md"
                      >
                        <span className="text-gray-700 font-medium">{f}</span>
                        <button
                          onClick={() => handleDelete(f)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </li>
                    ))
                ) : (
                  <p className="text-gray-400 italic">No files uploaded</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
