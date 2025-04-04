import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AdminDataContext } from "../context/AdminContext";

const AdminProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setAdmin } = useContext(AdminDataContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setAdmin(response.data.admin);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          localStorage.removeItem("token");
          navigate("/admin-login");
        });
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export default AdminProtectedWrapper;
