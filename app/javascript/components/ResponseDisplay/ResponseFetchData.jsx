export const DATA = {
    "POLL": {
        "id": 1,
        "title": "Vacations!",
        "author_id": 2,
        "description": "Where have you gone on vacation? Where would you like to go?",
        "created_at": "2021-07-23T21:49:10.264Z",
        "updated_at": "2021-07-23T21:49:10.264Z"
    },
    "AUTHOR": {
        "id": 2,
        "username": "admin",
        "password_digest": "$2a$12$Dq7TWE3ns5jkmKERZO0nAODpSldhERGKZ0co2hArTbwqGAMdNaV3S",
        "created_at": "2021-07-23T21:49:10.256Z",
        "updated_at": "2021-07-23T21:49:10.256Z",
        "admin": true,
        "session_token": "P1j1XUsr6DqowXpsoYaMLQ"
    },
    "QUESTIONS": [
        {
            "id": 1,
            "parent_poll_id": 1,
            "title": "How recently did you return from your last vacation?",
            "question_type": ":RADIO",
            "required": true,
            "created_at": "2021-07-23T21:49:10.269Z",
            "updated_at": "2021-07-23T21:49:10.269Z"
        },
        {
            "id": 2,
            "parent_poll_id": 1,
            "title": "Do you have a future vacation scheduled?",
            "question_type": ":RADIO",
            "required": true,
            "created_at": "2021-07-23T21:49:10.317Z",
            "updated_at": "2021-07-23T21:49:10.317Z"
        }
    ],
    "RESPONSE_OPTIONS": {
        "1": [
            {
                "id": 1,
                "parent_question_id": 1,
                "text": "Less than a week ago.",
                "created_at": "2021-07-23T21:49:10.274Z",
                "updated_at": "2021-07-23T21:49:10.274Z"
            },
            {
                "id": 2,
                "parent_question_id": 1,
                "text": "Less than six months ago.",
                "created_at": "2021-07-23T21:49:10.277Z",
                "updated_at": "2021-07-23T21:49:10.277Z"
            },
            {
                "id": 3,
                "parent_question_id": 1,
                "text": "Less than two years ago.",
                "created_at": "2021-07-23T21:49:10.281Z",
                "updated_at": "2021-07-23T21:49:10.281Z"
            },
            {
                "id": 4,
                "parent_question_id": 1,
                "text": "Two or more years ago.",
                "created_at": "2021-07-23T21:49:10.284Z",
                "updated_at": "2021-07-23T21:49:10.284Z"
            }
        ],
        "2": [
            {
                "id": 5,
                "parent_question_id": 2,
                "text": "yes",
                "created_at": "2021-07-23T21:49:10.321Z",
                "updated_at": "2021-07-23T21:49:10.321Z"
            },
            {
                "id": 6,
                "parent_question_id": 2,
                "text": "no",
                "created_at": "2021-07-23T21:49:10.324Z",
                "updated_at": "2021-07-23T21:49:10.324Z"
            }
        ]
    },
    "RESPONSE": {
        "id": 1,
        "respondent_id": 1,
        "poll_id": 1,
        "created_at": "2021-07-26T20:04:22.736Z",
        "updated_at": "2021-07-26T20:04:22.736Z"
    },
    "RESPONDENT": {
        "id": 1,
        "username": "jason",
        "password_digest": "$2a$12$dEEQTEzF5yDGdHM33ECWL.hyHCWJvItpZ/sPW2iCFOFoN5hJWJ2L6",
        "created_at": "2021-07-26T20:04:22.445Z",
        "updated_at": "2021-07-26T20:04:22.445Z",
        "admin": false,
        "session_token": "PHALqialKaIEEw2owC-P3w"
    },
    "ANSWERS": {
        "1": {
            "id": 2,
            "parent_question_id": 1,
            "text": "Less than six months ago.",
            "created_at": "2021-07-26T20:04:22.713Z",
            "updated_at": "2021-07-26T20:04:22.713Z"
        },
        "2": {
            "id": 6,
            "parent_question_id": 2,
            "text": "no",
            "created_at": "2021-07-26T20:04:22.763Z",
            "updated_at": "2021-07-26T20:04:22.763Z"
        }
    }
}
