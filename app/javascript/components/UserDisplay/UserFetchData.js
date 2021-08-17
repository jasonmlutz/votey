// pre-fetched data at /api/v1/users/2

export const DATA = {
  USER: {
    id: 2,
    username: "admin",
    password_digest:
      "$2a$12$fvMqUlln.NGtENNzFURl7eAiR7xXOntzPenh5WCJ6T6cFcAqMpw0O",
    created_at: "2021-07-30T18:02:56.465Z",
    updated_at: "2021-07-30T18:02:56.465Z",
    admin: true,
    session_token: "U58in23mMENNChZt-iAZnw",
  },
  POLLS: [
    {
      id: 1,
      title: "Vacations!",
      author_id: 2,
      description:
        "Where have you gone on vacation? Where would you like to go?",
      created_at: "2021-07-30T18:02:56.474Z",
      updated_at: "2021-07-30T18:02:56.474Z",
    },
  ],
  RESPONSE_DATA: [
    [
      {
        id: 2,
        respondent_id: 2,
        poll_id: 1,
        created_at: "2021-07-30T19:12:08.682Z",
        updated_at: "2021-07-30T19:12:08.682Z",
      },
      {
        id: 1,
        title: "Vacations!",
        author_id: 2,
        description:
          "Where have you gone on vacation? Where would you like to go?",
        created_at: "2021-07-30T18:02:56.474Z",
        updated_at: "2021-07-30T18:02:56.474Z",
      },
    ],
  ],
};
