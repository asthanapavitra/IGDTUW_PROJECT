# Student API Documentation

## Authentication Routes

### 1. Register Student

**POST** `/student/register`

Registers a new student account. The email must belong to the `igdtuw.ac.in` domain.

**Request Body:**

```json
{
  "email": "student@igdtuw.ac.in",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "password": "string",
  "enrollmentNo": "string",
  "department": "CSE|IT|ECE|MAE|CSE-AI|AI-ML|ECE-AI",
  "semester": "1|2|3|4|5|6|7|8",
  "securityQuestion": {
    "question": [
      "What is the name of your best childhood friend?",
      "What is your favorite color?",
      "What was the name of your first school?",
      "What is your favorite food?",
      "What is your dream job?"
    ],
    "answer": "string"
  }
}
```

**Response (201 Created):**

```json
{
  "newStudent": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@igdtuw.ac.in",
    "department": "CSE",
    "enrollmentNo": "2020/CSE/001",
    "semester": "5",
    "securityQuestion": {
      "question": "What is your favorite color?",
      "answer": "Blue"
    },
    "_id": "uuid"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Invalid Email"
    }
  ]
}
```

---

### 2. Login Student

**POST** `/student/login`

Authenticates a student and returns a JWT token. The password field is excluded from the response.

**Request Body:**

```json
{
  "enrollmentNo": "string",
  "password": "string"
}
```

**Response (201 Created):**

```json
{
  "token": "jwt_token_string",
  "student": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@igdtuw.ac.in",
    "department": "CSE",
    "enrollmentNo": "2020/CSE/001",
    "semester": "5",
    "securityQuestion": {
      "question": "What is your favorite color?",
      "answer": "Blue"
    },
    "_id": "uuid"
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "errors": [
    {
      "msg": "Invalid credentials"
    }
  ]
}
```

---

### 3. Student Dashboard

**GET** `/student/dashboard`

Retrieves the authenticated student's information. Requires a valid JWT token.

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response (201 Created):**

```json
{
  "student": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@igdtuw.ac.in",
    "department": "CSE",
    "enrollmentNo": "2020/CSE/001",
    "semester": "5",
    "securityQuestion": {
      "question": "What is your favorite color?",
      "answer": "Blue"
    },
    "_id": "uuid"
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "msg": "Unauthorized, login first"
}
```

---

### 4. Logout Student

**GET** `/student/logout`

Logs out the authenticated student by clearing the session token.

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**

```json
{
  "msg": "Logged out successfully"
}
```

---

## Password Management Routes

### 5. Check Email

**POST** `/updatePassword/check-email`

Verifies if the provided email exists for a student or faculty.

**Request Body:**

```json
{
  "email": "string",
  "user": "student|faculty"
}
```

**Response (200 OK):**

```json
{
  "msg": "Email found",
  "user": {
    "email": "student@igdtuw.ac.in",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "securityQuestion": {
      "question": "What is your favorite color?",
      "answer": "Blue"
    }
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Invalid credentials"
    }
  ]
}
```

---

### 6. Check Security Question

**POST** `/updatePassword/check-security-question`

Validates the answer to the security question for a student or faculty.

**Request Body:**

```json
{
  "email": "string",
  "user": "student|faculty",
  "answer": "string"
}
```

**Response (200 OK):**

```json
{
  "msg": "Question matched"
}
```

**Error Response (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Question did not match"
    }
  ]
}
```

---

### 7. Update Password

**POST** `/updatePassword/new-password`

Updates the password for a student or faculty.

**Request Body:**

```json
{
  "email": "string",
  "user": "student|faculty",
  "newPassword": "string"
}
```

**Response (200 OK):**

```json
{
  "msg": "Password updated"
}
```

**Error Response (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Invalid credentials"
    }
  ]
}
```

---

## Error Responses

**Validation Error (400):**

```json
{
  "errors": [
    {
      "msg": "Invalid Email"
    }
  ]
}
```

**Authentication Error (401):**

```json
{
  "msg": "Unauthorized, login first"
}
```

**Server Error (500):**

```json
{
  "error": "Error message"
}
```

---

## Validation Rules

- Email must be from igdtuw.ac.in domain (for students).
- First name must be at least 3 characters.
- Password must be at least 6 characters.
- Enrollment number must be at least 11 characters.
- Department must be one of: CSE, IT, ECE, MAE, CSE-AI, AI-ML, ECE-AI.
- Semester must be between 1 and 8.
- Security question must be one of the predefined options.
