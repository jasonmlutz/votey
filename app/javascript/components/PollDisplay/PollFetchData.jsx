// with current seed data, this is the return value of GET /api/v1/polls/1

export const DATA = {
    "POLL": {
        "id": 1,
        "title": "Vacations!",
        "author_id": 2,
        "description": "Where have you gone on vacation? Where would you like to go?",
        "created_at": "2021-07-21T17:35:50.507Z",
        "updated_at": "2021-07-21T17:35:50.507Z"
    },
    "AUTHOR": {
        "id": 2,
        "username": "admin",
        "password_digest": "$2a$12$Xcmv3WuFLb6SfDn2ptlM0uG.qVOsq0bZgx7zydiuJ2zMwF65YtAdi",
        "created_at": "2021-07-21T17:35:50.499Z",
        "updated_at": "2021-07-21T17:35:50.499Z",
        "admin": true,
        "session_token": "wG0BgRFUU_DmrbsngfD3lA"
    },
    "QUESTIONS": [
        {
            "id": 1,
            "parent_poll_id": 1,
            "title": "How recently did you return from your last vacation?",
            "question_type": ":RADIO",
            "required": true,
            "created_at": "2021-07-21T17:35:50.512Z",
            "updated_at": "2021-07-21T17:35:50.512Z"
        },
        {
            "id": 2,
            "parent_poll_id": 1,
            "title": "Do you have a future vacation scheduled?",
            "question_type": ":RADIO",
            "required": true,
            "created_at": "2021-07-21T17:35:50.557Z",
            "updated_at": "2021-07-21T17:35:50.557Z"
        }
    ],
    "RESPONSE_OPTIONS": {
        "1": [
            {
                "id": 1,
                "parent_question_id": 1,
                "text": "Less than a week ago.",
                "created_at": "2021-07-21T17:35:50.518Z",
                "updated_at": "2021-07-21T17:35:50.518Z"
            },
            {
                "id": 2,
                "parent_question_id": 1,
                "text": "Less than six months ago.",
                "created_at": "2021-07-21T17:35:50.523Z",
                "updated_at": "2021-07-21T17:35:50.523Z"
            },
            {
                "id": 3,
                "parent_question_id": 1,
                "text": "Less than two years ago.",
                "created_at": "2021-07-21T17:35:50.527Z",
                "updated_at": "2021-07-21T17:35:50.527Z"
            },
            {
                "id": 4,
                "parent_question_id": 1,
                "text": "Two or more years ago.",
                "created_at": "2021-07-21T17:35:50.532Z",
                "updated_at": "2021-07-21T17:35:50.532Z"
            }
        ],
        "2": [
            {
                "id": 5,
                "parent_question_id": 2,
                "text": "yes",
                "created_at": "2021-07-21T17:35:50.561Z",
                "updated_at": "2021-07-21T17:35:50.561Z"
            },
            {
                "id": 6,
                "parent_question_id": 2,
                "text": "no",
                "created_at": "2021-07-21T17:35:50.565Z",
                "updated_at": "2021-07-21T17:35:50.565Z"
            }
        ]
    }
}
