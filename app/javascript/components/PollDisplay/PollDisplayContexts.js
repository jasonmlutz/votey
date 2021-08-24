import React, { createContext, useState } from "react";

export const RadioInputContext = createContext();

export const RadioInputProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  return (
    <RadioInputContext.Provider value={{ answers, setAnswers }}>
      {children}
    </RadioInputContext.Provider>
  );
};
