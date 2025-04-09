import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentRegister from "./pages/StudentRegister";
import "remixicon/fonts/remixicon.css";
import LMSLogin from "./pages/LMSLogin";
import FacultyLogin from "./pages/FacultyLogin";
import LMSDashboard from "./pages/LMSDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import CoursePage from "./pages/CoursePage";
import MyCourses from "./pages/MyCourses";
import PdfViewer from "./pages/PdfViewer";
import StudentProfile from "./pages/StudentProfile";
import LMSProtectedWrapper from "./pages/LMSProtectedWrapper";
import FacultyProtectedWrapper from "./pages/FacultyProtectedWrapper";
import AdminProtectedWrapper from "./pages/AdminProtectedWrapper";
import AdminDashboard from "./pages/AdminDashboard";

import FacultyDashBoard from "./pages/FacultyDashBoard";
import AdminLogin from "./pages/AdminLogin";
import AllotmentDashboard from "./pages/AllotmentDashboard";
import AddMaterial from "./pages/AddMaterial";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lms-login" element={<LMSLogin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/lms-register" element={<StudentRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/faculty-dashboard"
          element={
            <FacultyProtectedWrapper>
              <FacultyDashBoard />
            </FacultyProtectedWrapper>
          }
        />
        <Route
          path="/lms-dashboard"
          element={
            <LMSProtectedWrapper>
              <LMSDashboard />
            </LMSProtectedWrapper>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedWrapper>
              <AdminDashboard />
            </AdminProtectedWrapper>
          }
        /><Route
        path="/allotment-dashboard"
        element={
          <AdminProtectedWrapper>
            <AllotmentDashboard />
          </AdminProtectedWrapper>
        }
      />
        <Route
          path="/my-courses"
          element={
            <LMSProtectedWrapper>
              <MyCourses />
            </LMSProtectedWrapper>
          }
        />
        
        <Route
          path="/course"
          element={
            <LMSProtectedWrapper>
              <CoursePage />
            </LMSProtectedWrapper>
          }
        />
        <Route
          path="/pdf-viewer"
          element={
            <LMSProtectedWrapper>
              <PdfViewer />
            </LMSProtectedWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <LMSProtectedWrapper>
              <StudentProfile />
            </LMSProtectedWrapper>
          }
        />
        <Route
          path="/add-materials"
          element={
            <FacultyProtectedWrapper>
              <AddMaterial />
            </FacultyProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
