# User Stories and Acceptance Criteria

## Project
Online Quiz System

---

# 1. Overview

This document defines the **user stories and acceptance criteria** for the Online Quiz System.

User stories describe the functionality from the perspective of different users of the system. Acceptance criteria define the conditions that must be satisfied for a user story to be considered successfully implemented.

The main users of the system are:

- Admin
- Student/User

---

# 2. User Roles

| Role | Description |
|-----|-------------|
| Admin | Manages quizzes, questions, and results |
| Student/User | Registers, attempts quizzes, and views results |

---

# 3. User Stories

---

# 3.1 User Registration

### User Story

As a **student**,  
I want to **register an account**,  
So that I can **log in and attempt quizzes**.

### Acceptance Criteria

- The system must provide a registration form.
- The user must enter:
  - Name
  - Email
  - Password
- Email must be unique.
- Password must be securely stored using encryption.
- After successful registration, the user should be able to log in.

---

# 3.2 User Login

### User Story

As a **registered user**,  
I want to **log in to the system**,  
So that I can **access quizzes and my results**.

### Acceptance Criteria

- The login form must require:
  - Email
  - Password
- The system must validate user credentials.
- If credentials are correct, the user should be redirected to the dashboard.
- If credentials are incorrect, an error message should be displayed.

---

# 3.3 View Available Quizzes

### User Story

As a **student**,  
I want to **view the list of available quizzes**,  
So that I can **choose which quiz to attempt**.

### Acceptance Criteria

- The dashboard must display all available quizzes.
- Each quiz should show:
  - Quiz title
  - Description
  - Number of questions
  - Time limit (if applicable)
- Users should be able to select a quiz to start.

---

# 3.4 Start Quiz

### User Story

As a **student**,  
I want to **start a quiz**,  
So that I can **answer the questions**.

### Acceptance Criteria

- The system should load quiz questions.
- Each question must display:
  - Question text
  - Multiple choice options
- Users should be able to select one option per question.

---

# 3.5 Attempt Questions

### User Story

As a **student**,  
I want to **select answers for each question**,  
So that I can **complete the quiz**.

### Acceptance Criteria

- Each question must allow selecting only one answer.
- Users should be able to change their answer before submitting.
- The system must store selected answers temporarily until submission.

---

# 3.6 Submit Quiz

### User Story

As a **student**,  
I want to **submit the quiz**,  
So that the **system can calculate my score**.

### Acceptance Criteria

- The user must be able to click a submit button.
- The system must compare user answers with correct answers.
- The system must calculate the final score.
- The score must be displayed to the user.

---

# 3.7 View Quiz Result

### User Story

As a **student**,  
I want to **see my quiz result**,  
So that I can **know my performance**.

### Acceptance Criteria

The result page should display:

- Quiz name
- Total questions
- Correct answers
- Final score
- Date of attempt

The result must also be stored in the database.

---

# 3.8 Admin Login

### User Story

As an **admin**,  
I want to **log in to the admin dashboard**,  
So that I can **manage quizzes and questions**.

### Acceptance Criteria

- Admin login must be secure.
- Only authorized admins should access admin features.
- Admin users should be redirected to the admin dashboard after login.

---

# 3.9 Create Quiz

### User Story

As an **admin**,  
I want to **create a quiz**,  
So that users can attempt it.

### Acceptance Criteria

The admin should be able to enter:

- Quiz title
- Quiz description
- Time limit

After creation, the quiz should appear in the quiz list.

---

# 3.10 Add Questions

### User Story

As an **admin**,  
I want to **add questions to a quiz**,  
So that users can answer them.

### Acceptance Criteria

Each question must include:

- Question text
- Four answer options
- One correct answer

Questions must be linked to a specific quiz.

---

# 3.11 Manage Quizzes

### User Story

As an **admin**,  
I want to **edit or delete quizzes**,  
So that I can manage quiz content.

### Acceptance Criteria

The admin must be able to:

- Update quiz information
- Delete quizzes
- View all quizzes

---

# 3.12 View Results

### User Story

As an **admin**,  
I want to **view quiz results**,  
So that I can analyze student performance.

### Acceptance Criteria

The system should display:

- User name
- Quiz attempted
- Score
- Attempt date

---

# 4. Optional Features

---

# 4.1 Quiz Timer

### User Story

As a **student**,  
I want a **timer during the quiz**,  
So that I know how much time remains.

### Acceptance Criteria

- A timer should be displayed during the quiz.
- If the time expires, the quiz should automatically submit.

---

# 4.2 Random Questions

### User Story

As a **student**,  
I want the **questions to appear in random order**,  
So that quizzes are fair.

### Acceptance Criteria

- Questions should be shuffled for each user.
- The correct answers must still be evaluated correctly.

---

# 4.3 Leaderboard

### User Story

As a **student**,  
I want to **see the leaderboard**,  
So that I can compare my score with others.

### Acceptance Criteria

Leaderboard must display:

- Rank
- User name
- Score

The leaderboard should show the top 10 scores.

---

# 5. Definition of Done

A feature is considered complete when:

- The functionality works as expected.
- Acceptance criteria are satisfied.
- The feature has been tested.
- No critical bugs remain.

---

# 6. Summary

This document outlines the key user stories and acceptance criteria for the Online Quiz System. These stories help guide development and ensure that the system meets user needs.