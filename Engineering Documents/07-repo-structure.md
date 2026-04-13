# Repository Structure

## Project
Online Quiz System

---

# 1. Overview

This document describes the repository structure of the Online Quiz System.  
The project follows a **MERN stack architecture**, separating the frontend, backend, and documentation into clearly organized directories.

The repository is structured to support scalability, maintainability, and collaborative development.

Main components of the repository:

- Frontend (React)
- Backend (Node.js + Express)
- Database configuration
- Documentation
- Environment configuration
- Deployment files

---

# 2. Root Repository Structure

```
online-quiz-system
│
├── client
├── server
├── docs
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Description

| File/Folder | Description |
|-------------|-------------|
| client | React frontend application |
| server | Node.js backend server |
| docs | Project documentation |
| .env | Environment variables |
| .gitignore | Files ignored by Git |
| package.json | Project dependencies |
| README.md | Project overview |

---

# 3. Frontend Directory Structure (React)

The frontend handles the user interface and communicates with backend APIs.

```
client
│
├── public
│   └── index.html
│
├── src
│   │
│   ├── assets
│   │   └── images
│   │
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── QuizCard.jsx
│   │   ├── Question.jsx
│   │   └── Timer.jsx
│   │
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── QuizPage.jsx
│   │   ├── ResultPage.jsx
│   │   └── AdminPanel.jsx
│   │
│   ├── context
│   │   └── AuthContext.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── routes
│   │   └── AppRoutes.jsx
│   │
│   ├── utils
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

### Key Folders

| Folder | Purpose |
|------|---------|
| components | Reusable UI components |
| pages | Main application pages |
| context | Global state management |
| services | API communication |
| routes | Application routing |
| utils | Helper functions |

---

# 4. Backend Directory Structure (Node.js)

The backend handles business logic, API endpoints, and database operations.

```
server
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── quizController.js
│   ├── questionController.js
│   └── resultController.js
│
├── models
│   ├── User.js
│   ├── Quiz.js
│   ├── Question.js
│   ├── QuizAttempt.js
│   └── Answer.js
│
├── routes
│   ├── authRoutes.js
│   ├── quizRoutes.js
│   ├── questionRoutes.js
│   └── resultRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── utils
│   └── calculateScore.js
│
├── server.js
└── package.json
```

### Key Backend Modules

| Module | Purpose |
|------|---------|
| config | Database connection |
| controllers | Request handling logic |
| models | MongoDB schemas |
| routes | API endpoints |
| middleware | Authentication and error handling |
| utils | Helper functions |

---

# 5. Documentation Directory

The `docs` directory contains all project documentation.

```
docs
│
├── 01-product-requirements.md
├── 02-user-stories-and-acceptance-criteria.md
├── 03-information-architecture.md
├── 04-system-architecture.md
├── 05-database-schema.md
├── 06-api-contracts.md
└── 07-repo-structure.md
```

These documents describe:

- System requirements
- User stories
- Architecture
- Database schema
- API contracts
- Repository organization

---

# 6. Environment Configuration

The `.env` file stores environment variables.

Example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/quizsystem
JWT_SECRET=mysecretkey
```

Sensitive information such as database credentials and authentication keys should never be committed to the repository.

---

# 7. Git Ignore Configuration

The `.gitignore` file excludes unnecessary files.

Example:

```
node_modules
.env
build
dist
logs
```

---

# 8. Deployment Files (Optional)

Additional files may be included for deployment.

Example structure:

```
deployment
│
├── Dockerfile
├── docker-compose.yml
└── render.yaml
```

These files help deploy the application to cloud platforms.

---

# 9. Development Workflow

Typical development workflow:

```
Clone Repository
      │
      ▼
Install Dependencies
      │
      ▼
Start Backend Server
      │
      ▼
Start Frontend Application
      │
      ▼
Develop Features
      │
      ▼
Commit Changes
      │
      ▼
Push to GitHub
```

---

# 10. Repository Best Practices

To maintain a clean and efficient repository:

- Use clear folder names
- Separate frontend and backend code
- Maintain documentation
- Write meaningful commit messages
- Follow consistent coding standards

---

# 11. Example Repository Layout

```
online-quiz-system
│
├── client
│   └── React frontend
│
├── server
│   └── Node.js backend
│
├── docs
│   └── project documentation
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 12. Conclusion

The repository structure of the Online Quiz System is designed to keep the project organized and scalable. By separating frontend, backend, and documentation, developers can easily navigate and maintain the system as it grows.