# Votey

## Goals/Todos

### v0

#### rails
1. build user model
1. build session model
1. build user registration pipeline
1. build session management scheme (login)
1. build validations
   1. username uniqueness, presence
   1. password length
   1. session token presence

#### react
1. build user registration form
1. build user login form

### v0.5

#### react
1. build user show page

### v1

#### rails
1. build poll model - :title, :author_id, :description (optional)
1. build question model - :parent_poll_id, :title, :question_type (limit options), :required (boolean)
   1. question_type field default to :RADIO
   1. required default t
1. build response_option model - :parent_question_id, :text
1. build response model - :respondent_id, :parent_poll_id
1. build answer model - :parent_response_id, :parent_question_id, :response_option_id
1. build associations
   1. <poll(s) user>
   1. <poll question(s)>
   1. <question response_option(s)>
   1. <question response(s)>
1. build validations
   1. associations
   1. a user may have at most one Response per Poll
   1. sensible presence/uniqueness
   1. a Response may not have duplicate Answer.parent_question_id (:RADIO)

#### react
1. build question show scheme
1. build poll show page
   1. questions display as react components
   1. radio button for :RADIO default question_type
   1. responses can be selected; console.log(values)
      3. values of the form { :parent_question_id, :response_option_id } for Answer.new( {} )
1. build response show page

### v1.5

#### rails
1. build poll seed data
1. build response seed data

#### react
1. add to user show:
   1. links to polls authored
   1. links to responses submitted

### v2

#### rails
1. build logic to persist Responses

#### react
1. build Response view component

### v3

#### rails
1. poll creation logic
   1. question creation logic
   1. response_option logic
1. poll index logic

#### react
1. poll creation form
1. question creation form
1. response_option creation form
1. poll index view

### v4

#### rails
1. poll edit logic; question, answer option

#### react
1. poll edit form

### v?

1. determine how to encode response model for multiple question types: multiple-choice, one or more, short answer
1. build dynamic validations.
   1. Answer - :parent_question must have :response_option as one of its options; that is, must respond to a question with a valid response_options
   1. Similarly, Answer belonds to Response, so matching between Poll and Question that are in the response.
1. visualizations for Poll.responses
1. prevent poll edit if Poll.responses not empty
1. anonymous/hidden poll responses?
1. handle non-required poll questions?
1. Poll > ++Section++ > Question > Answer_option
