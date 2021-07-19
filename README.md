# Votey

## Goals/Todos

Following [Thinking In React](https://reactjs.org/docs/thinking-in-react.html) tutorial, visual elements are built first to be static and stateless. This is followed by adding state, then interacting with the database (as needed).

### v0

#### rails
1. build user model
1. build user registration pipeline
1. build validations
   - username uniqueness, presence
   - password length
   - session token presence

#### react
1. build user index
1. build user registration form
1. build user login form

### v0.5

#### rails
1. build session registration pipeline
1. build session management scheme (login)
    - current_user, logout, reset_session_token, etc.

#### react
1. build user show page

### v1

#### rails
1. build poll model - :title, :author_id, :description (optional)
1. build question model - :parent_poll_id, :title, :question_type (limit options), :required (boolean)
   - question_type field default to :RADIO
   - required default t
1. build response_option model - :parent_question_id, :text
1. build response model - :respondent_id, :parent_poll_id
1. build answer model - :parent_response_id, :parent_question_id, :response_option_id
1. build associations
   - <poll(s) user>
   - <poll question(s)>
   - <question response_option(s)>
   - <question response(s)>
1. build validations
   - associations
   - a user may have at most one Response per Poll
   - sensible presence/uniqueness
   - a Response may not have duplicate Answer.parent_question_id (:RADIO)

#### react
1. build question show scheme
1. build poll show page
   - questions display as react components
   - radio button for :RADIO default question_type
   - responses can be selected; console.log(values)
      3. values of the form { :parent_question_id, :response_option_id } for Answer.new( {} )
1. build response show page

### v1.5

#### rails
1. build poll seed data
1. build response seed data

#### react
1. add to user show:
   - links to polls authored
   - links to responses submitted

### v2

#### rails
1. build logic to persist Responses

#### react
1. build Response view component

### v3

#### rails
1. poll creation logic
   - question creation logic
   - response_option logic
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
   - Answer - :parent_question must have :response_option as one of its options; that is, must respond to a question with a valid response_options
   - Similarly, Answer belonds to Response, so matching between Poll and Question that are in the response.
1. visualizations for Poll.responses
1. prevent poll edit if Poll.responses not empty
1. anonymous/hidden poll responses?
1. handle non-required poll questions?
1. Poll > ++Section++ > Question > Answer_option
1. add meaningful admin privileges
1. media queries for page width, for example
1. add question number for questions < polls

## Initial Project Roadmap ###

1. What is the goal of the project?
1. Who is the target audience?
1. What are your personal learning goals?
1. What technologies/frameworks/patterns will you be employing?
1. What are the tech and/or skill dependencies of your project?
1. What does success look like for this project? What does _done_ mean?
