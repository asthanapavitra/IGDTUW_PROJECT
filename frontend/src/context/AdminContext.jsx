import React, { useState } from "react";
import { createContext } from "react";

export const AdminDataContext = createContext();
const AdminContext = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  return (
    <div>
      <AdminDataContext.Provider value={{ admin, setAdmin }}>
        {children}
      </AdminDataContext.Provider>
    </div>
  );
};

export default AdminContext;
