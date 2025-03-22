import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import 'remixicon/fonts/remixicon.css'
import LMSLogin from "./pages/LMSLogin";
import FacultyLogin from "./pages/FacultyLogin";
import LMSDashboard from "./pages/LMSDashboard";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lms-login" element={<LMSLogin />} />
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/lms-register" element={<Register />} />
        <Route path="/lms-dashboard" element={<LMSDashboard/>} />
        <Route path="/faculty-register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
