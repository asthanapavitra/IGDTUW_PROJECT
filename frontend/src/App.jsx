import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<Login />} />
        <Route path="/faculty-login" element={<Login />} />
        <Route path="/student-register" element={<Register />} />
        <Route path="/faculty-register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
