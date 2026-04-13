# API Contracts

## Project
Online Quiz System

---

# 1. Overview

This document defines the API contracts used by the Online Quiz System.

The frontend (React) communicates with the backend (Node.js + Express) using REST APIs.  
All APIs exchange data using **JSON format**.

Base API URL:

```
http://localhost:5000/api
```

Production example:

```
https://api.onlinequizsystem.com/api
```

---

# 2. API Design Principles

The APIs follow standard REST principles:

| Principle | Description |
|---|---|
| Stateless | Each request contains all required information |
| Resource-based | APIs represent resources like users, quizzes, questions |
| JSON Format | All requests and responses use JSON |
| Secure | Protected routes require authentication |

---

# 3. Authentication

The system uses **JWT (JSON Web Token)** authentication.

### Authentication Flow

```
User Login
   │
   ▼
Server verifies credentials
   │
   ▼
Server generates JWT token
   │
   ▼
Token returned to client
   │
   ▼
Client sends token in Authorization header
```

### Authorization Header

```
Authorization: Bearer <token>
```

---

# 4. Authentication APIs

---

## 4.1 Register User

### Endpoint

```
POST /api/auth/register
```

### Description

Creates a new user account.

### Request Body

```json
{
  "name": "Ajay Tharu",
  "email": "ajay@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "message": "User registered successfully"
}
```

### Error Response

```json
{
  "error": "Email already exists"
}
```

---

## 4.2 Login User

### Endpoint

```
POST /api/auth/login
```

### Description

Authenticates user credentials.

### Request Body

```json
{
  "email": "ajay@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "u123",
    "name": "Ajay Tharu",
    "role": "student"
  }
}
```

---

# 5. Quiz APIs

---

## 5.1 Get All Quizzes

### Endpoint

```
GET /api/quizzes
```

### Description

Returns all available quizzes.

### Response

```json
[
  {
    "id": "q101",
    "title": "JavaScript Basics",
    "description": "Basic JS quiz",
    "totalQuestions": 10,
    "timeLimit": 10
  }
]
```

---

## 5.2 Get Quiz by ID

### Endpoint

```
GET /api/quizzes/:quizId
```

### Description

Returns quiz details.

### Example

```
GET /api/quizzes/q101
```

### Response

```json
{
  "id": "q101",
  "title": "JavaScript Basics",
  "description": "Basic JS quiz",
  "timeLimit": 10
}
```

---

## 5.3 Create Quiz (Admin)

### Endpoint

```
POST /api/quizzes
```

### Authorization

Admin only.

### Request Body

```json
{
  "title": "JavaScript Basics",
  "description": "Introductory quiz",
  "timeLimit": 10
}
```

### Response

```json
{
  "message": "Quiz created successfully"
}
```

---

## 5.4 Delete Quiz

### Endpoint

```
DELETE /api/quizzes/:quizId
```

### Authorization

Admin only.

### Response

```json
{
  "message": "Quiz deleted successfully"
}
```

---

# 6. Question APIs

---

## 6.1 Add Question

### Endpoint

```
POST /api/questions
```

### Authorization

Admin only.

### Request Body

```json
{
  "quizId": "q101",
  "questionText": "What is JavaScript?",
  "options": [
    "Programming Language",
    "Database",
    "Operating System",
    "Compiler"
  ],
  "correctAnswer": "Programming Language"
}
```

### Response

```json
{
  "message": "Question added successfully"
}
```

---

## 6.2 Get Questions for Quiz

### Endpoint

```
GET /api/questions/:quizId
```

### Example

```
GET /api/questions/q101
```

### Response

```json
[
  {
    "questionId": "ques001",
    "questionText": "What is JavaScript?",
    "options": [
      "Programming Language",
      "Database",
      "Operating System",
      "Compiler"
    ]
  }
]
```

Note:  
The correct answer is **not sent to the client** for security.

---

# 7. Quiz Attempt APIs

---

## 7.1 Submit Quiz

### Endpoint

```
POST /api/quiz/submit
```

### Description

Submits answers and calculates the score.

### Request Body

```json
{
  "quizId": "q101",
  "answers": {
    "ques001": "Programming Language",
    "ques002": "Node.js"
  }
}
```

### Response

```json
{
  "score": 8,
  "totalQuestions": 10
}
```

---

# 8. Result APIs

---

## 8.1 Get User Results

### Endpoint

```
GET /api/results/user/:userId
```

### Response

```json
[
  {
    "quizTitle": "JavaScript Basics",
    "score": 8,
    "totalQuestions": 10,
    "attemptDate": "2026-04-15"
  }
]
```

---

## 8.2 Get Quiz Leaderboard

### Endpoint

```
GET /api/results/leaderboard/:quizId
```

### Response

```json
[
  {
    "rank": 1,
    "userName": "Ajay",
    "score": 9
  },
  {
    "rank": 2,
    "userName": "Rahul",
    "score": 8
  }
]
```

---

# 9. Error Handling

The API uses standard HTTP status codes.

| Status Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 500 | Internal server error |

### Example Error Response

```json
{
  "error": "Invalid credentials"
}
```

---

# 10. API Rate Limiting

To prevent abuse, the system may implement rate limiting.

Example policy:

| Limit | Description |
|---|---|
| 100 requests/minute | Per user |
| 10 login attempts/minute | Per IP |

---

# 11. API Security

Security practices include:

- JWT authentication
- Password hashing using bcrypt
- Input validation
- Role-based access control

Protected routes require a valid token.

Example protected endpoint:

```
POST /api/quizzes
```

---

# 12. API Versioning

To support future updates, APIs may include versioning.

Example:

```
/api/v1/auth/login
/api/v1/quizzes
```

---

# 13. Summary

This API contract defines the communication between the frontend and backend of the Online Quiz System. It ensures a consistent structure for requests and responses, enabling efficient development and integration of system components.