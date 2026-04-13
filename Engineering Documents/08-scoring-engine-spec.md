# Scoring Engine Specification

## Project
Online Quiz System

---

# 1. Overview

The Scoring Engine is responsible for evaluating quiz responses submitted by users and calculating the final score.  
It compares the user's answers with the correct answers stored in the database and determines the number of correct responses.

The scoring engine is implemented in the backend (Node.js + Express) and interacts with the database to retrieve questions and store results.

---

# 2. Purpose

The scoring engine provides automated evaluation of quiz attempts.

Main objectives:

- Evaluate user answers
- Calculate quiz score
- Store result in database
- Return score to frontend
- Support future scoring rules

---

# 3. Input Data

The scoring engine receives the following data from the frontend.

| Field | Type | Description |
|------|------|-------------|
| userId | ObjectId | ID of the user |
| quizId | ObjectId | ID of the quiz |
| answers | Object | User answers mapped to question IDs |

### Example Input

```json
{
  "userId": "u123",
  "quizId": "q101",
  "answers": {
    "ques001": "A",
    "ques002": "C",
    "ques003": "B"
  }
}
```

---

# 4. Output Data

After processing the answers, the scoring engine returns the result.

| Field | Type | Description |
|------|------|-------------|
| score | Number | Number of correct answers |
| totalQuestions | Number | Total quiz questions |
| percentage | Number | Score percentage |

### Example Output

```json
{
  "score": 8,
  "totalQuestions": 10,
  "percentage": 80
}
```

---

# 5. Scoring Algorithm

The scoring algorithm follows a simple comparison method.

### Steps

1. Fetch all quiz questions from database.
2. Retrieve correct answers.
3. Compare each user answer with the correct answer.
4. Increment score for each correct answer.
5. Calculate final percentage.
6. Store result in database.

---

# 6. Scoring Formula

```
Score = Number of Correct Answers

Percentage = (Score / Total Questions) × 100
```

Example:

```
Total Questions = 10
Correct Answers = 8

Score = 8
Percentage = (8 / 10) × 100 = 80%
```

---

# 7. Scoring Flow

```
User submits quiz
        │
        ▼
Backend receives answers
        │
        ▼
Fetch questions from database
        │
        ▼
Compare answers with correct answers
        │
        ▼
Calculate score
        │
        ▼
Store result in database
        │
        ▼
Return score to frontend
```

---

# 8. Backend Implementation Logic

Example pseudocode for scoring engine.

```
score = 0

for each question in quiz:
    if userAnswer == correctAnswer:
        score = score + 1

percentage = (score / totalQuestions) * 100
```

---

# 9. Example Node.js Implementation

```javascript
async function calculateScore(quizId, userAnswers) {

    const questions = await Question.find({ quizId });

    let score = 0;

    questions.forEach(question => {

        const userAnswer = userAnswers[question._id];

        if (userAnswer === question.correctAnswer) {
            score++;
        }

    });

    const totalQuestions = questions.length;

    const percentage = (score / totalQuestions) * 100;

    return {
        score,
        totalQuestions,
        percentage
    };
}
```

---

# 10. Result Storage

After calculating the score, the system stores the result in the database.

### Result Structure

| Field | Type | Description |
|------|------|-------------|
| userId | ObjectId | User ID |
| quizId | ObjectId | Quiz ID |
| score | Number | Correct answers |
| totalQuestions | Number | Total quiz questions |
| percentage | Number | Final percentage |
| submittedAt | Date | Submission time |

Example document:

```json
{
  "userId": "u123",
  "quizId": "q101",
  "score": 8,
  "totalQuestions": 10,
  "percentage": 80,
  "submittedAt": "2026-04-15T10:40:00Z"
}
```

---

# 11. Error Handling

The scoring engine must handle the following errors.

| Error | Description |
|------|-------------|
| Invalid quiz ID | Quiz not found |
| Missing answers | User did not answer all questions |
| Database error | Failure retrieving questions |

Example error response:

```json
{
  "error": "Quiz not found"
}
```

---

# 12. Optional Scoring Rules (Future Enhancements)

The scoring engine can be extended to support additional rules.

## Negative Marking

Incorrect answers reduce score.

Example:

```
Correct Answer = +1
Wrong Answer = -0.25
```

---

## Weighted Questions

Different questions can have different weights.

Example:

| Question | Weight |
|---------|--------|
| Q1 | 1 |
| Q2 | 2 |
| Q3 | 3 |

Score formula:

```
Score = Sum of question weights for correct answers
```

---

## Partial Scoring

For multi-select questions, partial points can be awarded.

Example:

```
Correct options = A,B
User selected = A

Score = 0.5
```

---

# 13. Performance Considerations

To ensure efficient scoring:

- Fetch questions using indexed queries
- Process answers using in-memory comparison
- Avoid multiple database calls
- Use batch operations for result storage

---

# 14. Security Considerations

Security measures include:

- Correct answers must never be sent to the frontend.
- Scoring must only occur on the backend.
- Validate user answers before processing.

---

# 15. Testing Strategy

Test cases for scoring engine.

| Test Case | Expected Result |
|-----------|----------------|
| All answers correct | Score = total questions |
| All answers wrong | Score = 0 |
| Partial correct answers | Score equals correct count |
| Missing answers | Validation error |

---

# 16. Conclusion

The scoring engine ensures accurate and automated evaluation of quiz attempts.  
By implementing the scoring logic on the backend, the system maintains security and reliability while providing instant feedback to users.