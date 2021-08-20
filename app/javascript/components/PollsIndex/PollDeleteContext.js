import React, { createContext, useState } from "react";

export const PollDeleteContext = createContext();

export const PollDeleteProvider = ({ children }) => {
  const [pollDelete, setPollDelete] = useState(null);
  return (
    <PollDeleteContext.Provider value={{ pollDelete, setPollDelete }}>
      {children}
    </PollDeleteContext.Provider>
  );
};
