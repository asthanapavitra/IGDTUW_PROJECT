# Student API Documentation

## Authentication Routes

### 1. Register Student

**POST** `/student/register`

Register a new student account. Email must be from igdtuw.ac.in domain.

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
  "semester": "1|2|3|4|5|6|7|8"
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
    "_id": "uuid"
  }
}
```

### 2. Login Student

**POST** `/student/login`

Authenticate a student and receive a JWT token.

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
    "_id": "uuid"
  }
}
```

### 3. Student Dashboard

**GET** `/student/dashboard`

Retrieve student's information. Requires authentication.

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
    "_id": "uuid"
  }
}
```

### 4. Logout Student

**GET** `/student/logout`

Invalidate the current session token. Requires authentication.

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

## Validation Rules

- Email must be from igdtuw.ac.in domain
- First name must be at least 3 characters
- Password must be at least 6 characters
- Enrollment number must be at least 11 characters
- Department must be one of: CSE, IT, ECE, MAE, CSE-AI, AI-ML, ECE-AI
- Semester must be between 1 and 8
