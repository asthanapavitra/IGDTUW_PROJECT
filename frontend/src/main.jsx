import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StudentContext from "./context/StudentContext.jsx";
import FacultyContext from "./context/FacultyContext.jsx";
import AdminContext from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StudentContext>
      <FacultyContext>
        <AdminContext>
          <App />
        </AdminContext>
      </FacultyContext>
    </StudentContext>
  </BrowserRouter>
);
