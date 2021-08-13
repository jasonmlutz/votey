import React, { createContext, useState } from "react";

// function onRadioChange(question_id, response_id) {
//   this.setState(prevState => ({
//     answers: {
//       ...prevState.answers,
//       [question_id]: response_id
//     }
//   }));
// }

export const RadioInputContext = createContext();

export class RadioInputProvider extendsReactComponent ({ children }) => {
  return (
    <RadioInputContext.Provider value={onRadioChange}>
      {children}
    </RadioInputContext.Provider>
  )
}
