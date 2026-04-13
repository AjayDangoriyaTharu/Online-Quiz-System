# System Architecture

## Project
Online Quiz System

---

# 1. Overview

The system architecture defines how different components of the Online Quiz System interact with each other. It describes the overall structure of the application, including the frontend, backend, and database layers.

The Online Quiz System follows a **three-tier architecture**:

1. Presentation Layer (Frontend)
2. Application Layer (Backend)
3. Data Layer (Database)

This architecture ensures separation of concerns, scalability, and easier maintenance.

---

# 2. High-Level Architecture

The system is built using the **MERN Stack**:

- MongoDB (Database)
- Express.js (Backend framework)
- React.js (Frontend framework)
- Node.js (Server runtime)

```
User (Browser)
      │
      ▼
React Frontend
      │
REST API
      │
      ▼
Node.js + Express Backend
      │
      ▼
MongoDB Database
```

---

# 3. Architecture Layers

## 3.1 Presentation Layer (Frontend)

The presentation layer is responsible for the user interface and user interactions.

Technology Used:
- React.js
- HTML
- CSS
- JavaScript

Responsibilities:

- Display user interface
- Handle user inputs
- Send API requests to the backend
- Display quiz questions
- Show quiz results

Main frontend components:

- Login Page
- Register Page
- Dashboard
- Quiz Page
- Result Page
- Admin Panel

---

## 3.2 Application Layer (Backend)

The backend layer handles business logic and communication between the frontend and database.

Technology Used:

- Node.js
- Express.js

Responsibilities:

- Handle API requests
- Authenticate users
- Manage quizzes and questions
- Calculate quiz scores
- Store and retrieve results

Key backend modules:

- Authentication module
- Quiz management module
- Question management module
- Result processing module

---

## 3.3 Data Layer (Database)

The data layer is responsible for storing and retrieving application data.

Technology Used:

- MongoDB

Responsibilities:

- Store user accounts
- Store quizzes and questions
- Store quiz results
- Maintain data integrity

Collections used:

- Users
- Quizzes
- Questions
- Results

---

# 4. Component Architecture

The backend system is divided into multiple components to ensure modular design.

```
Backend System
│
├── Controllers
│   ├── Auth Controller
│   ├── Quiz Controller
│   └── Result Controller
│
├── Models
│   ├── User Model
│   ├── Quiz Model
│   ├── Question Model
│   └── Result Model
│
├── Routes
│   ├── Auth Routes
│   ├── Quiz Routes
│   └── Result Routes
│
├── Middleware
│   └── Authentication Middleware
│
└── Configuration
    └── Database Configuration
```

---

# 5. Frontend Architecture

The React frontend follows a **component-based architecture**.

```
React Application
│
├── Pages
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── Quiz Page
│   └── Result Page
│
├── Components
│   ├── Navbar
│   ├── Quiz Card
│   └── Question Component
│
├── Services
│   └── API Service
│
├── Context
│   └── Authentication Context
│
└── Routing
    └── App Routes
```

Responsibilities:

- Manage UI components
- Handle navigation between pages
- Send requests to backend APIs
- Display data from server responses

---

# 6. Backend Architecture

The backend follows the **MVC (Model-View-Controller) pattern**.

```
Client Request
      │
      ▼
Route Layer
      │
      ▼
Controller Layer
      │
      ▼
Model Layer
      │
      ▼
MongoDB Database
```

Explanation:

Routes  
Define API endpoints.

Controllers  
Handle request logic and process data.

Models  
Define database schema.

Database  
Stores persistent data.

---

# 7. API Communication

The frontend communicates with the backend using **REST APIs**.

Example API endpoints:

| Method | Endpoint | Description |
|------|-----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | User login |
| GET | /api/quizzes | Get all quizzes |
| GET | /api/questions/:quizId | Get quiz questions |
| POST | /api/result | Submit quiz result |

Communication format:

JSON (JavaScript Object Notation)

Example request:

```
POST /api/result

{
  "userId": "123",
  "quizId": "456",
  "answers": {
    "q1": "A",
    "q2": "B"
  }
}
```

---

# 8. Security Architecture

Security is implemented at multiple levels.

Authentication

- JWT (JSON Web Token) is used for secure login sessions.

Password Security

- Passwords are encrypted using bcrypt before storing.

Access Control

- Admin-only routes are protected using middleware.

Example protected route:

```
/api/admin/create-quiz
```

Only admin users can access this endpoint.

---

# 9. Deployment Architecture

The system can be deployed using cloud services.

Example deployment structure:

```
User Browser
      │
      ▼
Frontend Hosting (Vercel / Netlify)
      │
      ▼
Backend Server (Render / AWS / Heroku)
      │
      ▼
MongoDB Atlas (Cloud Database)
```

Advantages:

- Scalable
- Secure
- Accessible from anywhere

---

# 10. System Workflow

The following steps describe how the system operates.

User attempts quiz:

```
User Login
      │
      ▼
Dashboard
      │
      ▼
Select Quiz
      │
      ▼
Fetch Questions from Backend
      │
      ▼
Display Questions
      │
      ▼
User Submits Answers
      │
      ▼
Backend Calculates Score
      │
      ▼
Result Stored in Database
      │
      ▼
Result Displayed to User
```

---

# 11. Scalability Considerations

The architecture supports scalability through:

- Modular backend design
- Stateless API architecture
- Cloud-based database
- Independent frontend deployment

Future scaling options:

- Load balancers
- Microservices architecture
- Distributed databases

---

# 12. Fault Tolerance

The system ensures reliability through:

- Error handling in APIs
- Input validation
- Secure database operations
- Backup mechanisms for stored data

---

# 13. Conclusion

The system architecture of the Online Quiz System follows a modern web architecture using the MERN stack. The layered architecture ensures maintainability, scalability, and efficient system performance.

By separating the frontend, backend, and database layers, the system can easily be extended with additional features such as leaderboards, analytics, and timed quizzes.