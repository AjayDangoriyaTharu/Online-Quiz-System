# Online Quiz System

A full-stack web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) that allows administrators to create quizzes and students to attempt them online with automated scoring.

---

## Features

### Student
- Register and login securely
- Browse available quizzes
- Attempt quizzes with live countdown timer
- Anti-cheat system (fullscreen lock, tab-switch detection, devtools block)
- Instant automated scoring after submission
- View full result history

### Admin
- Create and manage quizzes
- Add MCQ questions with correct answers
- Set time limits per quiz
- View all student attempts and scores
- Leaderboard per quiz

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT + bcrypt |
| Styling | CSS Modules |

---

## Project Structure

```
Online-Quiz-System/
├── client/          # React frontend (Vite)
├── server/          # Node.js + Express backend
├── Engineering Documents/  # PRD, API docs, DB schema
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account or local MongoDB

### Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=admin@quiz123
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`

---

## API Base URL

```
http://localhost:5001/api
```

---

## Admin Registration

To register as admin, use the secret key `admin@quiz123` in the Register page under **"Register as Admin?"**.

---

## Running Tests

```bash
cd server
npm test
```

18 tests covering Auth, Quiz, Question, and Result APIs.

---

## License

MIT
