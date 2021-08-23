# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Poll.destroy_all
Question.destroy_all
ResponseOption.destroy_all
Response.destroy_all
Answer.destroy_all
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('polls')
ApplicationRecord.connection.reset_pk_sequence!('questions')
ApplicationRecord.connection.reset_pk_sequence!('response_options')
ApplicationRecord.connection.reset_pk_sequence!('responses')
ApplicationRecord.connection.reset_pk_sequence!('answers')

ApplicationRecord.transaction do
  User.create(username: 'jason', password: 'password', admin: 'f')
  User.create(username: 'admin', password: 'password', admin: 't')

  Poll.create(
    title: 'Vacations!',
    author_id: 2,
    description: 'Where have you gone on vacation? Where would you like to go?'
  )
  Question.create(
    parent_poll_id: 1,
    title: "How recently did you return from your last vacation?"
  )
  ResponseOption.create(
    parent_question_id: 1,
    text: "Less than a week ago."
  )
  ResponseOption.create(
    parent_question_id: 1,
    text: "Less than six months ago."
  )
  ResponseOption.create(
    parent_question_id: 1,
    text: "Less than two years ago."
  )
  ResponseOption.create(
    parent_question_id: 1,
    text: "Two or more years ago."
  )
  Response.create(
    respondent_id: 1,
    poll_id: 1
  )
  Answer.create(
    response_id: 1,
    question_id: 1,
    response_option_id: 2
  )
  Question.create(
    parent_poll_id: 1,
    title: "Do you have a future vacation scheduled?"
  )
  ResponseOption.create(
    parent_question_id: 2,
    text: 'yes'
  )
  ResponseOption.create(
    parent_question_id: 2,
    text: 'no'
  )
  Answer.create(
    response_id: 1,
    question_id: 2,
    response_option_id: 6
  )
  Poll.create(
    title: 'Pets!',
    author_id: 1,
    description: 'What pets do you have?'
  )
  Question.create(
    parent_poll_id: 2,
    title: "How many pets do you own?"
  )
  ResponseOption.create(
    parent_question_id: 3,
    text: "0"
  )
  ResponseOption.create(
    parent_question_id: 3,
    text: "1"
  )
  ResponseOption.create(
    parent_question_id: 3,
    text: "2"
  )
  ResponseOption.create(
    parent_question_id: 3,
    text: "3"
  )
  ResponseOption.create(
    parent_question_id: 3,
    text: "4 or more"
  )
  Response.create(
    respondent_id: 2,
    poll_id: 2
  )
  Answer.create(
    response_id: 2,
    question_id: 3,
    response_option_id: 8
  )
  Question.create(
    parent_poll_id: 2,
    title: "Are you open to getting a(nother) pet?"
  )
  ResponseOption.create(
    parent_question_id: 4,
    text: "yes"
  )
  ResponseOption.create(
    parent_question_id: 4,
    text: "no"
  )
  Answer.create(
    response_id: 2,
    question_id: 4,
    response_option_id: 12
  )
  Poll.create(
    author_id: 1,
    title: "Required question test poll",
    description: "Testing the `required` question flag; see issue 22"
  ) # id: 3
  Question.create(
    parent_poll_id: 3,
    title: "This question is required. Correct?",
    required: 't'
  ) # id: 5
  ResponseOption.create(
    parent_question_id: 5,
    text: "it is indeed required."
  )
  ResponseOption.create(
    parent_question_id: 5,
    text: "it is NOT required"
  )
  Question.create(
    parent_poll_id: 3,
    title: "This question NOT is required. Correct?",
    required: 'f'
  ) #id: 6
  ResponseOption.create(
    parent_question_id: 6,
    text: "not required. that's right!"
  )
  ResponseOption.create(
    parent_question_id: 6,
    text: "i think it is in fact required"
  )

  User.create(username: 'kim', password: 'password', admin: 'f')
  User.create(username: 'kaylee', password: 'password', admin: 'f')
  User.create(username: 'logan', password: 'password', admin: 'f')
  User.create(username: 'dudley', password: 'password', admin: 'f')
end
