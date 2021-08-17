import React from "react";
import Routes from "./routes/index";

import { CurrentUserProvider } from "./contexts/CurrentUserContext";

export default function App(props) {
  return (
    <CurrentUserProvider>
      <Routes />
    </CurrentUserProvider>
  );
}
