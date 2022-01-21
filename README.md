# Votey

React + Rails implementation of a voting poll app.

## Functionality

1. **User management:** New users can register; a username must be unique and the password must be at least 6 characters. The existing `admin` user can delete existing users and polls.
2. **Session management:** The current user persists between portions of the app, and access is limited. For example, only the author of a poll can edit a poll, and a user may submit at most one response to a given poll.
3. **Poll creation:** A registered user may create a poll; it must have at least one question and each question must have at least one response option. At this time, the only supported question type is multiple choice, and all questions are flagged as required. A list of polls authored appears on the corresponding user's profile.
4. **Submitting responses:** A registered user may respond to an existing poll at most once, and all responses are visible to all site visitors. A list of responses submitted appears on the corresponding respondent's profile.
5. **Navigation:** This app includes some navigation features designed to improve the user experience. For example, when viewing a response to a given poll. A drop down menu allows for quick navigation to other responses to the same poll. The login and registration pages are linked to each other. The Polls index page includes a 'Login to Create Poll' button, which redirects to the create new poll form after successful login (or registration). Logging out while viewing the create new poll form prompts a modal, which gives options to return to Home or login.

## Live Version

View this project live on Heroku: [Votey](https://jml-votey.herokuapp.com/)

## Screenshots

![Screen Shot 2022-01-21 at 9 35 44 AM](https://user-images.githubusercontent.com/6218859/150573825-9a7f5813-6190-4110-9e3c-82a056720582.png)

![Screen Shot 2022-01-21 at 9 36 46 AM](https://user-images.githubusercontent.com/6218859/150573970-5fb98ec9-e4df-4669-a094-71b116c283d3.png)

![Screen Shot 2022-01-21 at 9 37 36 AM](https://user-images.githubusercontent.com/6218859/150574121-51c87ae9-3faa-4c5f-abd1-2a4626de2b14.png)
