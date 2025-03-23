import React, { useState } from "react";
import { createContext } from "react";

export const StudentDataContext = createContext();
const StudentContext = ({ children }) => {
  const [student, setStudent] = useState(null);
  return (
    <div>
      <StudentDataContext.Provider value={{ student, setStudent }}>
        {children}
      </StudentDataContext.Provider>
    </div>
  );
};

export default StudentContext;
