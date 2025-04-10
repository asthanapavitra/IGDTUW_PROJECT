import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, UploadCloud } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddMaterial() {
  const Location = useLocation();
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  // const allotment =
  const [selectedUnit, setSelectedUnit] = useState("Unit 1");
  const [fileName, setFileName] = useState("");
  const [fileObject, setFileObject] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allotment, setAllotment] = useState(Location.state?.allotment);

  useEffect(() => {
    // try {
    //   const fetchAllotment = async () => {
    //     const res = await axios.get(
    //       `${import.meta.env.VITE_BASE_URL}/faculty/get-materials/${
    //         allotment._id
    //       }`
    //     );
    //     if (res.status === 200) {
    //       setAllotment(res.data.allotment);
    //     }
    //   };
    //   fetchAllotment();
    // } catch (err) {
    //   console.log(err);
    // }

    if (allotment.materials.length > 0) {
      const files = [];

      allotment.materials.forEach((material) => {
        material.file.forEach((f) => {
          files.push({
            unit: `Unit ${f.unit}`,
            fileName: f.fileName,
            fileUrl: f.fileUrl,
          });
        });
      });
      setUploadedFiles(files);
      console.log(allotment);
    }
  }, [allotment]);

  // In handleUpload
  const handleUpload = (e) => {
    // e.preventDefault();
    if (!fileObject || !fileName.trim()) {
      alert("Please select a file and enter a file name.");
      return;
    }
    console.log(fileObject);
    alert(`Uploading "${fileName}" for ${selectedUnit}`);
    // You can now use fileObject to actually upload to your backend or cloud storage

    const formData = new FormData();
    formData.append("file", fileObject); // actual file
    formData.append("fileName", fileName);
    formData.append("unit", selectedUnit.replace("Unit ", ""));
    formData.append("subject", allotment.subject);

    const uploading = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/faculty/upload-material/${
            allotment._id
          }`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(res);
        if(res.status==201){
          setAllotment(res.data.allotment);
        }
      } catch (err) {
        console.log(err);
      }
    };
    uploading();

    setFileName("");
    setFileObject(null);
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
          Upload Materials –{" "}
          <span className="text-purple-700">{allotment.subject}</span>
        </h1>

        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/40 mb-10">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              📚 Select Unit:
            </label>
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
              📝 File Name (custom):
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g., LectureNotes.pdf"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-3"
            />{" "}
            <label className="block text-sm font-semibold mb-2">
              📁 Choose File:
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFileObject(e.target.files[0]);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button
            onClick={handleUpload}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg self-end"
          >
            <UploadCloud className="w-5 h-5" /> Upload
          </button>
        </div>

        {/* Uploaded Materials */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          📂 Uploaded Materials
        </h2>
        <div className="space-y-6">
          {units.map((unit) => (
            <div
              key={unit}
              className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl p-5 shadow-sm"
            >
              <h3 className="text-lg font-bold text-indigo-700 mb-3">{unit}</h3>
              <ul className="space-y-2">
                {uploadedFiles.filter((f) => f.unit === unit).length > 0 ? (
                  uploadedFiles
                    .filter((f) => f.unit === unit)
                    .map((f, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 shadow-sm hover:shadow-md"
                      >
                        <a
                          href={f.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 font-medium truncate max-w-[70%] sm:max-w-[85%]"
                        >
                          {f.fileName}
                        </a>
                        <button
                          onClick={() => handleDelete(f.fileName)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
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
