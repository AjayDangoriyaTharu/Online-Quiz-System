# Product Requirements Document (PRD)

## Project Title
Online Quiz System

---

# 1. Product Overview

The Online Quiz System is a web-based application that allows administrators to create quizzes and users to attempt them online. The system automatically evaluates answers and generates scores instantly. All quiz results are stored in a database for future reference.

The system aims to simplify quiz management and eliminate manual evaluation by providing a digital platform for conducting quizzes.

---

# 2. Problem Statement

Traditional quiz systems rely on paper-based assessments. These systems require manual checking of answers and manual calculation of scores. This process creates several challenges:

- Evaluation is time-consuming
- Human errors may occur during marking
- Managing large numbers of students is difficult
- Students cannot receive instant feedback

To solve these issues, an automated online quiz system is needed that allows quizzes to be conducted digitally and evaluated automatically.

---

# 3. Product Goals

| Goal | Description |
|-----|-------------|
| Digital Quiz Platform | Conduct quizzes through a web-based system |
| Automated Evaluation | Automatically calculate quiz scores |
| Efficient Quiz Management | Allow administrators to manage quizzes and questions |
| Result Storage | Store results securely in a database |
| Accessibility | Allow users to attempt quizzes from any device |

---

# 4. Target Users

## 4.1 Admin

The administrator manages the entire quiz system.

Responsibilities include:

- Creating quizzes
- Adding and managing questions
- Viewing quiz results
- Managing user accounts

---

## 4.2 Student / User

Students use the platform to participate in quizzes.

Responsibilities include:

- Registering an account
- Logging into the system
- Viewing available quizzes
- Attempting quizzes
- Viewing quiz results

---

# 5. Core Features

## 5.1 User Authentication

Users must be able to securely create accounts and log in to the system.

Features include:

- User registration
- Secure login system
- Password encryption
- Role-based access control (Admin / Student)

---

## 5.2 Quiz Management (Admin)

Administrators must be able to manage quizzes.

Features include:

- Create new quizzes
- Edit quiz information
- Delete quizzes
- Set quiz time limits
- View list of quizzes

---

## 5.3 Question Management

Administrators must be able to create and manage quiz questions.

Each question should include:

- Question text
- Four answer options (MCQ)
- Correct answer

Example structure:

```
Question: What is JavaScript?

A. Programming Language
B. Database
C. Operating System
D. Compiler

Correct Answer: A
```

---

## 5.4 Quiz Attempt (User)

Users must be able to attempt quizzes.

Steps:

1. User selects a quiz
2. System displays questions
3. User selects answers
4. User submits quiz

Two display modes should be supported:

- Show all questions on one page
- Show one question at a time

---

## 5.5 Score Calculation

After quiz submission:

- The system compares user answers with correct answers
- The system calculates the total score
- The result is displayed to the user

Example scoring logic:

```
Score = Number of Correct Answers
```

---

## 5.6 Result Storage

The system must store quiz results in the database.

Stored information includes:

- User ID
- Quiz ID
- Score
- Total questions
- Date and time of submission

Users should be able to view their previous quiz results.

---

# 6. Functional Requirements

| ID | Requirement |
|----|-------------|
| FR1 | Users must be able to register |
| FR2 | Users must be able to login |
| FR3 | Admin must be able to create quizzes |
| FR4 | Admin must be able to add questions |
| FR5 | Users must be able to attempt quizzes |
| FR6 | System must calculate quiz scores automatically |
| FR7 | System must store quiz results |
| FR8 | Users must be able to view their results |
| FR9 | Admin must be able to view all quiz attempts |

---

# 7. Non-Functional Requirements

## Performance
The system should respond to user actions within **2 seconds**.

## Security
- Passwords must be encrypted.
- Unauthorized users must not access admin features.

## Scalability
The system should support multiple users attempting quizzes at the same time.

## Reliability
The system should maintain data integrity and prevent loss of quiz results.

---

# 8. User Stories

| User | Story |
|-----|------|
| Student | As a student, I want to register so that I can access quizzes |
| Student | As a student, I want to attempt quizzes to test my knowledge |
| Student | As a student, I want to see my results immediately |
| Admin | As an admin, I want to create quizzes |
| Admin | As an admin, I want to add questions to quizzes |

---

# 9. Success Metrics

The success of the system will be measured by:

- Number of quizzes created
- Number of users attempting quizzes
- Accuracy of automatic scoring
- System response time
- User satisfaction

---

# 10. Future Enhancements

Possible improvements for future versions include:

- Timer-based quizzes
- Randomized question order
- Leaderboard for top scores
- Quiz analytics dashboard
- Certificate generation
- AI-generated questions

---

# 11. Technology Stack

| Layer | Technology |
|------|-------------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | MongoDB |
| Authentication | JWT |
| Version Control | Git + GitHub |

---

# 12. Assumptions

- Users will have internet access.
- The system will be accessed through a web browser.
- Administrators will manage quiz content responsibly.

---

# 13. Constraints

- Internet connectivity is required.
- Database capacity may limit storage if not optimized.
- System performance depends on server resources.