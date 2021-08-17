import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const RadioInputContext = createContext();

export const RadioInputProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  return (
    <RadioInputContext.Provider value={{ answers, setAnswers }}>
      {children}
    </RadioInputContext.Provider>
  );
};

RadioInputProvider.propTypes = { children: PropTypes.object.isRequired };
