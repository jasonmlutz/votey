export const DATA = {
  USERS : [
    {
      id: 1,
      username: 'jason'
    },
    {
      id: 2,
      username: 'admin'
    }
  ],
  POLLS : [
    {
      id: 1,
      title: 'Vacations!',
      author_id: 2,
      description: 'Where have you gone on vacation? Where would you like to go?'
    }
  ],
  QUESTIONS : [
    {
      id: 1,
      parent_poll_id: 1,
      title: "How recently did you return from your last vacation?"
    },
    {
      id: 2,
      parent_poll_id: 1,
      title: "Do you have a future vacation scheduled?"
    }
  ],
  RESPONSE_OPTIONS : [
    {
      id: 1,
      parent_question_id: 1,
      text: "Less than a week ago."
    },
    {
      id: 2,
      parent_question_id: 1,
      text: "Less than six months ago."
    },
    {
      id: 3,
      parent_question_id: 1,
      text: "Less than two years ago."
    },
    {
      id: 4,
      parent_question_id: 1,
      text: "Two or more years ago."
    },
    {
      id: 5,
      parent_question_id: 2,
      text: 'yes'
    },
    {
      id: 6,
      parent_question_id: 2,
      text: 'no'
    }
  ],
  RESPONSES : [
    {
      id: 1,
      respondent_id: 1,
      poll_id: 1
    }
  ],
  ANSWERS : [
    {
      id: 1,
      response_id: 1,
      question_id: 1,
      response_option_id: 2
    },
    {
      id: 2,
      response_id: 1,
      question_id: 2,
      response_option_id: 6
    }
  ]
}
