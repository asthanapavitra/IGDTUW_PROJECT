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


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lms-login" element={<LMSLogin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/lms-register" element={<StudentRegister />} />
        <Route
          path="/lms-dashboard"
          element={
            <LMSProtectedWrapper>
              <LMSDashboard />
            </LMSProtectedWrapper>
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
      </Routes>
    </>
  );
};

export default App;
