# Backend API Documentation

## Project
Online Quiz System

---

## Base URL

```
http://localhost:5001/api
```

---

## Authentication

All protected routes require a JWT token in the request header:

```
Authorization: Bearer <token>
```

Token is received after login and must be stored on the frontend (localStorage).

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (missing or invalid fields) |
| 401 | Unauthorized (missing or invalid token) |
| 403 | Forbidden (not admin) |
| 404 | Not Found |
| 500 | Server Error |

---

# 1. Auth APIs

---

## 1.1 Register User

**Endpoint**
```
POST /api/auth/register
```

**Access:** Public

**Request Body**
```json
{
  "name": "Ajay Tharu",
  "email": "ajay@example.com",
  "password": "password123"
}
```

**Register as Admin** (include adminSecret)
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "adminSecret": "admin@quiz123"
}
```

**Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Full name |
| email | String | Yes | Unique email address |
| password | String | Yes | Minimum any length |
| adminSecret | String | No | If matches server secret, role becomes admin |

**Success Response** `201`
```json
{
  "message": "User registered successfully",
  "role": "student"
}
```

**Error Responses**

```json
{ "error": "All fields are required" }
{ "error": "Email already exists" }
```

**Frontend Usage**
- Call on Register page form submit
- On success redirect to `/login`
- Show error message if email already exists

---

## 1.2 Login

**Endpoint**
```
POST /api/auth/login
```

**Access:** Public

**Request Body**
```json
{
  "email": "ajay@example.com",
  "password": "password123"
}
```

**Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | String | Yes | Registered email |
| password | String | Yes | Account password |

**Success Response** `200`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "664f1a2b3c4d5e6f7a8b9c0d",
    "name": "Ajay Tharu",
    "email": "ajay@example.com",
    "role": "student"
  }
}
```

**Error Responses**

```json
{ "error": "Email and password are required" }
{ "error": "Invalid credentials" }
```

**Frontend Usage**
- Save `token` to `localStorage`
- Save `user` object to `localStorage` and context
- If `role === 'admin'` redirect to `/admin`
- If `role === 'student'` redirect to `/dashboard`

---

# 2. Quiz APIs

---

## 2.1 Get All Quizzes

**Endpoint**
```
GET /api/quizzes
```

**Access:** Protected (Student + Admin)

**Headers**
```
Authorization: Bearer <token>
```

**Success Response** `200`
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "title": "JavaScript Basics",
    "description": "Test your JS knowledge",
    "createdBy": "664f1a2b3c4d5e6f7a8b9c01",
    "timeLimit": 10,
    "totalQuestions": 5,
    "createdAt": "2026-04-15T10:00:00.000Z",
    "updatedAt": "2026-04-15T10:00:00.000Z"
  }
]
```

**Frontend Usage**
- Call on Dashboard page load
- Display each quiz as a card with title, description, totalQuestions, timeLimit
- Each card has a Start Quiz button that navigates to `/quiz/:_id`

---

## 2.2 Get Quiz By ID

**Endpoint**
```
GET /api/quizzes/:quizId
```

**Access:** Protected (Student + Admin)

**Headers**
```
Authorization: Bearer <token>
```

**URL Params**

| Param | Description |
|-------|-------------|
| quizId | MongoDB ObjectId of the quiz |

**Success Response** `200`
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c0d",
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge",
  "createdBy": "664f1a2b3c4d5e6f7a8b9c01",
  "timeLimit": 10,
  "totalQuestions": 5,
  "createdAt": "2026-04-15T10:00:00.000Z"
}
```

**Error Response**
```json
{ "error": "Quiz not found" }
```

**Frontend Usage**
- Call on Quiz page load to get quiz details like timeLimit for the countdown timer

---

## 2.3 Create Quiz

**Endpoint**
```
POST /api/quizzes
```

**Access:** Admin only

**Headers**
```
Authorization: Bearer <adminToken>
Content-Type: application/json
```

**Request Body**
```json
{
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge",
  "timeLimit": 10
}
```

**Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Quiz title |
| description | String | No | Short description |
| timeLimit | Number | No | Time in minutes (0 = no limit) |

**Success Response** `201`
```json
{
  "message": "Quiz created successfully",
  "quiz": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "title": "JavaScript Basics",
    "description": "Test your JS knowledge",
    "createdBy": "664f1a2b3c4d5e6f7a8b9c01",
    "timeLimit": 10,
    "totalQuestions": 0,
    "createdAt": "2026-04-15T10:00:00.000Z"
  }
}
```

**Error Responses**
```json
{ "error": "Title is required" }
{ "error": "Admin access required" }
```

**Frontend Usage**
- Call from Admin Panel → Quizzes tab on form submit
- Use `quiz._id` from response to add questions to this quiz

---

## 2.4 Update Quiz

**Endpoint**
```
PUT /api/quizzes/:quizId
```

**Access:** Admin only

**Headers**
```
Authorization: Bearer <adminToken>
Content-Type: application/json
```

**Request Body** (send only fields to update)
```json
{
  "title": "JavaScript Basics Updated",
  "timeLimit": 15
}
```

**Success Response** `200`
```json
{
  "message": "Quiz updated successfully",
  "quiz": {
    "_id": "664f1a2b3c4d5e6f7a8b9c0d",
    "title": "JavaScript Basics Updated",
    "timeLimit": 15
  }
}
```

**Error Response**
```json
{ "error": "Quiz not found" }
```

---

## 2.5 Delete Quiz

**Endpoint**
```
DELETE /api/quizzes/:quizId
```

**Access:** Admin only

**Headers**
```
Authorization: Bearer <adminToken>
```

**Success Response** `200`
```json
{
  "message": "Quiz deleted successfully"
}
```

**Error Response**
```json
{ "error": "Quiz not found" }
```

**Frontend Usage**
- Call from Admin Panel → Quizzes tab on Delete button click
- Refresh quiz list after deletion

---

# 3. Question APIs

---

## 3.1 Get Questions by Quiz ID

**Endpoint**
```
GET /api/questions/:quizId
```

**Access:** Protected (Student + Admin)

**Headers**
```
Authorization: Bearer <token>
```

**URL Params**

| Param | Description |
|-------|-------------|
| quizId | MongoDB ObjectId of the quiz |

**Success Response** `200`
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c10",
    "quizId": "664f1a2b3c4d5e6f7a8b9c0d",
    "questionText": "What is JavaScript?",
    "options": [
      "Programming Language",
      "Database",
      "Operating System",
      "Compiler"
    ],
    "createdAt": "2026-04-15T10:00:00.000Z"
  }
]
```

**Note:** `correctAnswer` is NOT included in this response for security.

**Frontend Usage**
- Call on Quiz page load using `quizId` from URL params
- Render each question with radio button options
- Store selected answers as `{ [question._id]: selectedOption }`

---

## 3.2 Add Question

**Endpoint**
```
POST /api/questions
```

**Access:** Admin only

**Headers**
```
Authorization: Bearer <adminToken>
Content-Type: application/json
```

**Request Body**
```json
{
  "quizId": "664f1a2b3c4d5e6f7a8b9c0d",
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

**Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| quizId | String | Yes | ID of the quiz this question belongs to |
| questionText | String | Yes | The question |
| options | Array | Yes | Exactly 4 answer options as strings |
| correctAnswer | String | Yes | Must exactly match one of the options |

**Success Response** `201`
```json
{
  "message": "Question added successfully",
  "question": {
    "_id": "664f1a2b3c4d5e6f7a8b9c10",
    "quizId": "664f1a2b3c4d5e6f7a8b9c0d",
    "questionText": "What is JavaScript?",
    "options": ["Programming Language", "Database", "Operating System", "Compiler"],
    "correctAnswer": "Programming Language",
    "createdAt": "2026-04-15T10:00:00.000Z"
  }
}
```

**Error Responses**
```json
{ "error": "All fields are required" }
{ "error": "Admin access required" }
```

**Frontend Usage**
- Call from Admin Panel → Questions tab on form submit
- `correctAnswer` must exactly match one of the 4 options (case sensitive)
- Quiz `totalQuestions` is auto-incremented on backend

---

## 3.3 Update Question

**Endpoint**
```
PUT /api/questions/:questionId
```

**Access:** Admin only

**Headers**
```
Authorization: Bearer <adminToken>
Content-Type: application/json
```

**Request Body**
```json
{
  "questionText": "What is JavaScript? (Updated)",
  "options": ["Programming Language", "Database", "Operating System", "Compiler"],
  "correctAnswer": "Programming Language"
}
```

**Success Response** `200`
```json
{
  "message": "Question updated successfully",
  "question": { ... }
}
```

---

## 3.4 Delete Question

**Endpoint**
```
DELETE /api/questions/:questionId
```

**Access:** Admin only

**Headers**
```
Authorization: Bearer <adminToken>
```

**Success Response** `200`
```json
{
  "message": "Question deleted successfully"
}
```

**Note:** Quiz `totalQuestions` is auto-decremented on backend.

---

# 4. Result APIs

---

## 4.1 Submit Quiz

**Endpoint**
```
POST /api/results/submit
```

**Access:** Protected (Student)

**Headers**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**
```json
{
  "quizId": "664f1a2b3c4d5e6f7a8b9c0d",
  "answers": {
    "664f1a2b3c4d5e6f7a8b9c10": "Programming Language",
    "664f1a2b3c4d5e6f7a8b9c11": "Netscape"
  }
}
```

**Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| quizId | String | Yes | ID of the quiz being submitted |
| answers | Object | Yes | Key = question `_id`, Value = selected option string |

**How to build answers object on frontend:**
```js
// When student selects an option
const [answers, setAnswers] = useState({});

const handleSelect = (questionId, option) => {
  setAnswers(prev => ({ ...prev, [questionId]: option }));
};

// On submit send:
{ quizId, answers }
```

**Success Response** `200`
```json
{
  "score": 8,
  "totalQuestions": 10,
  "percentage": 80
}
```

**Error Responses**
```json
{ "error": "quizId and answers are required" }
```

**Frontend Usage**
- Call on Submit Quiz button click
- Display score, totalQuestions, percentage on result screen
- Backend auto-saves the attempt to database

---

## 4.2 Get User Results

**Endpoint**
```
GET /api/results/user/:userId
```

**Access:** Protected (Student + Admin)

**Headers**
```
Authorization: Bearer <token>
```

**URL Params**

| Param | Description |
|-------|-------------|
| userId | MongoDB ObjectId of the user (from login response) |

**Success Response** `200`
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c20",
    "userId": "664f1a2b3c4d5e6f7a8b9c01",
    "quizId": {
      "_id": "664f1a2b3c4d5e6f7a8b9c0d",
      "title": "JavaScript Basics"
    },
    "score": 8,
    "totalQuestions": 10,
    "percentage": 80,
    "startedAt": "2026-04-15T10:30:00.000Z",
    "submittedAt": "2026-04-15T10:40:00.000Z"
  }
]
```

**Frontend Usage**
- Call on My Results page using `user.id` from auth context
- Results are sorted by latest first
- Display quiz title from `quizId.title`

---

## 4.3 Get All Results (Admin)

**Endpoint**
```
GET /api/results/all
```

**Access:** Admin only

**Headers**
```
Authorization: Bearer <adminToken>
```

**Success Response** `200`
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c20",
    "userId": {
      "_id": "664f1a2b3c4d5e6f7a8b9c01",
      "name": "Ajay Tharu",
      "email": "ajay@example.com"
    },
    "quizId": {
      "_id": "664f1a2b3c4d5e6f7a8b9c0d",
      "title": "JavaScript Basics"
    },
    "score": 8,
    "totalQuestions": 10,
    "percentage": 80,
    "submittedAt": "2026-04-15T10:40:00.000Z"
  }
]
```

**Frontend Usage**
- Call from Admin Panel → Results tab
- Display user name from `userId.name`
- Display quiz title from `quizId.title`

---

## 4.4 Get Leaderboard

**Endpoint**
```
GET /api/results/leaderboard/:quizId
```

**Access:** Protected (Student + Admin)

**Headers**
```
Authorization: Bearer <token>
```

**URL Params**

| Param | Description |
|-------|-------------|
| quizId | MongoDB ObjectId of the quiz |

**Success Response** `200`
```json
[
  {
    "rank": 1,
    "userName": "Ajay Tharu",
    "score": 9
  },
  {
    "rank": 2,
    "userName": "Rahul",
    "score": 8
  }
]
```

**Frontend Usage**
- Call after quiz submission or from a leaderboard page
- Shows top 10 scores for a specific quiz

---

# 5. Frontend Integration Summary

## Auth Flow
```
Register → POST /api/auth/register
Login    → POST /api/auth/login → save token + user to localStorage
Logout   → clear localStorage
```

## Student Flow
```
Dashboard  → GET /api/quizzes
Start Quiz → GET /api/quizzes/:quizId (get timeLimit)
           → GET /api/questions/:quizId (get questions)
Submit     → POST /api/results/submit
Results    → GET /api/results/user/:userId
```

## Admin Flow
```
Create Quiz    → POST /api/quizzes
Add Question   → POST /api/questions
Update Quiz    → PUT /api/quizzes/:quizId
Delete Quiz    → DELETE /api/quizzes/:quizId
Update Q       → PUT /api/questions/:questionId
Delete Q       → DELETE /api/questions/:questionId
View Results   → GET /api/results/all
```

---

# 6. Important Notes for Frontend

1. **Token Storage** — Store JWT token in `localStorage` as `token`
2. **User Storage** — Store user object in `localStorage` as `user`
3. **correctAnswer** — Never returned in GET questions API, only used server-side
4. **answers object** — Keys must be question `_id` strings, values must exactly match option strings
5. **Admin Secret** — `admin@quiz123` — only needed at registration
6. **Token Expiry** — Token expires in 7 days, redirect to login on 401 response
7. **totalQuestions** — Auto managed by backend when questions are added/deleted
