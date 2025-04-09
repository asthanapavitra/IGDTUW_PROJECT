import React, { useState, createContext } from "react";
export const FacultyDataContext = createContext();
const FacultyContext = ({ children }) => {
  const [faculty, setfaculty] = useState({});
  return (
    <div>
      <FacultyDataContext.Provider value={{ faculty, setfaculty }}>
        {children}
      </FacultyDataContext.Provider>
    </div>
  );
};

export default FacultyContext;
