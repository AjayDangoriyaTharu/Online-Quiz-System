# Information Architecture

## Project
Online Quiz System

---

# 1. Overview

Information Architecture (IA) defines the structure, organization, and navigation of the Online Quiz System. It describes how information is arranged within the system and how users interact with different parts of the application.

The goal of the information architecture is to ensure that users can easily navigate through the system and access the required features efficiently.

The system contains two primary user roles:

- Admin
- Student/User

Each role interacts with the system through different interfaces and features.

---

# 2. System Structure

The Online Quiz System is organized into the following main sections:

| Section | Description |
|-------|-------------|
| Authentication | Handles user registration and login |
| User Dashboard | Displays quizzes available for users |
| Quiz Module | Allows users to attempt quizzes |
| Result Module | Displays quiz results and history |
| Admin Dashboard | Allows admins to manage quizzes and questions |

---

# 3. Site Map

The site map shows the hierarchical structure of pages in the system.

```
Online Quiz System
│
├── Home Page
│
├── Authentication
│   ├── Register Page
│   └── Login Page
│
├── User Dashboard
│   ├── View Available Quizzes
│   ├── Start Quiz
│   ├── Attempt Quiz
│   └── View Results
│
├── Quiz Module
│   ├── Quiz Instructions
│   ├── Question Page
│   ├── Submit Quiz
│   └── Result Page
│
└── Admin Dashboard
    ├── Manage Users
    ├── Manage Quizzes
    │   ├── Create Quiz
    │   ├── Edit Quiz
    │   └── Delete Quiz
    │
    ├── Manage Questions
    │   ├── Add Question
    │   ├── Edit Question
    │   └── Delete Question
    │
    └── View Quiz Results
```

---

# 4. Navigation Structure

The system uses a simple navigation structure so users can easily move between pages.

## Main Navigation (User)

| Navigation Item | Description |
|----------------|-------------|
| Dashboard | Shows available quizzes |
| My Results | Shows past quiz attempts |
| Profile | Displays user information |
| Logout | Logs the user out of the system |

---

## Admin Navigation

| Navigation Item | Description |
|----------------|-------------|
| Dashboard | Overview of system activity |
| Manage Quizzes | Create, update, or delete quizzes |
| Manage Questions | Add or edit quiz questions |
| View Results | View user quiz performance |
| Manage Users | View and manage registered users |

---

# 5. Page Hierarchy

The page hierarchy represents the relationship between different pages in the system.

```
Home
│
├── Register
├── Login
│
└── Dashboard
    │
    ├── Quiz List
    │   └── Quiz Details
    │       └── Start Quiz
    │           └── Question Page
    │               └── Submit Quiz
    │                   └── Result Page
    │
    └── Result History
```

---

# 6. Page Descriptions

## Home Page

The home page introduces the system and provides options to register or log in.

Features:
- System introduction
- Login button
- Register button

---

## Register Page

The register page allows new users to create accounts.

Fields:

- Name
- Email
- Password
- Confirm Password

---

## Login Page

The login page allows existing users to access the system.

Fields:

- Email
- Password

---

## User Dashboard

The dashboard displays the quizzes available for users.

Information shown:

- Quiz title
- Quiz description
- Number of questions
- Start quiz button

---

## Quiz Page

The quiz page displays questions for the selected quiz.

Features:

- Display question text
- Multiple choice options
- Next question button
- Submit quiz button

Two modes may be used:

- All questions on one page
- One question per page

---

## Result Page

The result page shows the user's quiz performance.

Displayed information:

- Quiz name
- Total questions
- Correct answers
- Final score
- Attempt date

---

## Admin Dashboard

The admin dashboard provides management features.

Admin can perform the following tasks:

- Create quizzes
- Add questions
- Edit quizzes
- Delete quizzes
- View results

---

# 7. Data Organization

Information in the system is stored in the following categories.

| Data Type | Description |
|----------|-------------|
| User Data | User accounts and authentication information |
| Quiz Data | Quiz titles and descriptions |
| Question Data | Quiz questions and answer options |
| Result Data | User scores and attempt history |

---

# 8. Content Hierarchy

Information is prioritized based on importance.

Level 1 (Primary Content)

- Quizzes
- Questions
- Results

Level 2 (Supporting Content)

- User profiles
- Quiz descriptions

Level 3 (Administrative Content)

- System settings
- User management

---

# 9. User Flow

## Student User Flow

```
Register/Login
      │
      ▼
User Dashboard
      │
      ▼
Select Quiz
      │
      ▼
Start Quiz
      │
      ▼
Answer Questions
      │
      ▼
Submit Quiz
      │
      ▼
View Result
```

---

## Admin User Flow

```
Admin Login
      │
      ▼
Admin Dashboard
      │
      ├── Create Quiz
      │
      ├── Add Questions
      │
      ├── Manage Quizzes
      │
      └── View Results
```

---

# 10. Search and Filtering

Future improvements may include search and filtering features.

Possible filters:

- Quiz category
- Difficulty level
- Date created
- Quiz popularity

---

# 11. Accessibility Considerations

The system should follow good accessibility practices:

- Clear navigation menus
- Readable font sizes
- Responsive design for mobile devices
- Simple interface for easy understanding

---

# 12. Conclusion

The information architecture of the Online Quiz System organizes the platform into clear sections that allow users to easily navigate through the system. It ensures that both administrators and students can efficiently access the features required to manage quizzes and attempt them online.