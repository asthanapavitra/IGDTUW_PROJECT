import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { FacultyDataContext } from "../context/FacultyContext";

const FacultyProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setfaculty } = useContext(FacultyDataContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/faculty-login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/faculty/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status == 201) {
            setfaculty(response.data.faculty);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response.data.error);
          setIsLoading(false);
          localStorage.removeItem("token");
          navigate("/faculty-login");
        });
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export default FacultyProtectedWrapper;
