# Database Schema

## Project
Online Quiz System

---

# 1. Overview

This document describes the database schema used in the Online Quiz System.  
The database is responsible for storing all system data including users, quizzes, questions, answers, and results.

The system uses **MongoDB** as the primary database, but the schema is also structured so it can be easily converted to relational databases like **MySQL or PostgreSQL**.

The database consists of the following main entities:

1. Users
2. Quizzes
3. Questions
4. Quiz Attempts
5. Answers

---

# 2. Entity Relationship Overview

```
User
 │
 │ attempts
 ▼
QuizAttempt
 │
 │ belongs to
 ▼
Quiz
 │
 │ contains
 ▼
Question
 │
 │ has
 ▼
Options
```

Relationship summary:

| Entity | Relationship |
|------|---------------|
| User | Attempts quizzes |
| Quiz | Contains questions |
| Question | Contains answer options |
| QuizAttempt | Stores user attempt |
| Answer | Stores user responses |

---

# 3. Users Collection

This collection stores information about all registered users.

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Unique user ID |
| name | String | User full name |
| email | String | User email address |
| password | String | Encrypted password |
| role | String | Role (admin or student) |
| createdAt | Date | Account creation time |

## Example Document

```json
{
  "_id": "u123",
  "name": "Ajay Tharu",
  "email": "ajay@example.com",
  "password": "hashed_password",
  "role": "student",
  "createdAt": "2026-04-15T10:00:00Z"
}
```

---

# 4. Quizzes Collection

This collection stores all quiz information.

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Unique quiz ID |
| title | String | Quiz title |
| description | String | Quiz description |
| createdBy | ObjectId | Admin who created quiz |
| timeLimit | Number | Quiz time limit (minutes) |
| totalQuestions | Number | Number of questions |
| createdAt | Date | Quiz creation date |

## Example Document

```json
{
  "_id": "q101",
  "title": "JavaScript Basics",
  "description": "Basic JavaScript quiz",
  "createdBy": "admin001",
  "timeLimit": 10,
  "totalQuestions": 10,
  "createdAt": "2026-04-15"
}
```

---

# 5. Questions Collection

This collection stores quiz questions.

Each question belongs to a specific quiz.

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Question ID |
| quizId | ObjectId | Associated quiz ID |
| questionText | String | Question content |
| options | Array | List of answer options |
| correctAnswer | String | Correct option |
| createdAt | Date | Creation time |

## Example Document

```json
{
  "_id": "ques001",
  "quizId": "q101",
  "questionText": "What is JavaScript?",
  "options": [
    "Programming Language",
    "Database",
    "Operating System",
    "Compiler"
  ],
  "correctAnswer": "Programming Language",
  "createdAt": "2026-04-15"
}
```

---

# 6. Quiz Attempts Collection

This collection stores each time a user attempts a quiz.

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Attempt ID |
| userId | ObjectId | User attempting quiz |
| quizId | ObjectId | Quiz attempted |
| score | Number | Final score |
| totalQuestions | Number | Total quiz questions |
| startedAt | Date | Quiz start time |
| submittedAt | Date | Quiz submission time |

## Example Document

```json
{
  "_id": "attempt001",
  "userId": "u123",
  "quizId": "q101",
  "score": 8,
  "totalQuestions": 10,
  "startedAt": "2026-04-15T10:30:00Z",
  "submittedAt": "2026-04-15T10:40:00Z"
}
```

---

# 7. Answers Collection

This collection stores the answers selected by users for each question.

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Answer ID |
| attemptId | ObjectId | Quiz attempt reference |
| questionId | ObjectId | Question reference |
| selectedOption | String | Option chosen by user |
| isCorrect | Boolean | Whether answer is correct |

## Example Document

```json
{
  "_id": "ans001",
  "attemptId": "attempt001",
  "questionId": "ques001",
  "selectedOption": "Programming Language",
  "isCorrect": true
}
```

---

# 8. Indexing Strategy

Indexes improve database performance.

Recommended indexes:

| Collection | Indexed Field |
|-----------|---------------|
| Users | email |
| Quizzes | title |
| Questions | quizId |
| QuizAttempts | userId |
| Answers | attemptId |

Example MongoDB index:

```
db.users.createIndex({ email: 1 }, { unique: true })
```

---

# 9. Data Validation Rules

The database should enforce the following constraints:

Users
- Email must be unique
- Password must be encrypted

Quizzes
- Quiz title cannot be empty

Questions
- Must contain at least two options
- Must include a correct answer

Quiz Attempts
- Must reference a valid user and quiz

---

# 10. Data Relationships

Summary of relationships:

| Entity | Relationship |
|------|---------------|
| User → QuizAttempt | One-to-many |
| Quiz → Question | One-to-many |
| QuizAttempt → Answer | One-to-many |
| Question → Answer | One-to-many |

---

# 11. Data Storage Flow

```
User registers
      │
      ▼
User stored in Users collection

Admin creates quiz
      │
      ▼
Quiz stored in Quizzes collection

Admin adds questions
      │
      ▼
Questions stored in Questions collection

User attempts quiz
      │
      ▼
QuizAttempt created

User answers stored
      │
      ▼
Answers stored in Answers collection

Score calculated
      │
      ▼
Result saved in QuizAttempts
```

---

# 12. Future Database Enhancements

Future improvements may include:

- Quiz categories table
- Difficulty levels for questions
- Leaderboard collection
- Analytics data storage
- User performance tracking

---

# 13. Conclusion

The database schema of the Online Quiz System is designed to efficiently store users, quizzes, questions, answers, and quiz attempts. The schema ensures data integrity and supports scalable growth as the system expands.