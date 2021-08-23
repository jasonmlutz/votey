import React, { createContext, useState } from "react";

export const UserDeleteContext = createContext();

export const UserDeleteProvider = ({ children }) => {
  const [userDelete, setUserDelete] = useState(null);
  return (
    <UserDeleteContext.Provider value={{ userDelete, setUserDelete }}>
      {children}
    </UserDeleteContext.Provider>
  );
};
