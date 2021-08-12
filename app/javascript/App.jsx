import React from "react";
import Routes from "./routes/index";

import { CurrentUserProvider } from "./contexts/CurrentUserContext"


export default function App(props) {
  const currentUser = {
        "id": 1,
        "username": "jason",
        "password_digest": "$2a$12$nqECnU1Bx.G9RRKpKV011OJxD/FNnqNdfrkEQBy.TUu43nPsz0LiG",
        "created_at": "2021-08-11T15:52:09.400Z",
        "updated_at": "2021-08-11T15:52:09.400Z",
        "admin": false,
        "session_token": "HpEUMR4DnD4GbUSRnsv1Jg"
    }

  return (
      <CurrentUserProvider value = {currentUser}>
        <Routes />
      </CurrentUserProvider>
  )
}
