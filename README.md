# Lab: Implement Authentication Using JWT

## Problem Statement

You are building a backend application where users can register, log in, and access protected resources.

Some endpoints should be accessible to everyone, while others should only be accessible to authenticated users.

Your task is to implement **JWT-based authentication** using Express.js, Prisma, PostgreSQL, and bcrypt.

The starter project already contains some public and protected endpoints.

## API Endpoints

| Method | Endpoint | Access | Status |
|---|---|---|---|
| POST | `/auth/register` | Public | TODO |
| POST | `/auth/login` | Public | TODO |
| GET | `/public` | Public | Implemented |
| GET | `/about` | Public | Implemented |
| GET | `/profile` | Protected | Implemented |
| GET | `/dashboard` | Protected | Implemented |

You need to implement only the registration endpoint, login endpoint, and authentication middleware.

## Setup

Install the JWT package:

```bash
npm install jsonwebtoken
```

Add the following variable to your `.env` file:

```env
JWT_SECRET=your_secret_key
```

Do not hardcode the JWT secret in your application.

---

## Task 1: Implement Register Endpoint

**File:** `src/server.js`

**Endpoint:** `POST /auth/register`

Implement an endpoint that allows a new user to register using their email and password.

**Request:**

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Requirements:**

1. Read `email` and `password` from `req.body`.
2. Validate that email is a string containing `@` and password is a string with at least 8 characters. Return `400` for invalid input.
3. Check whether the email already exists using `prisma.user.findUnique()`.
4. Return `409` if the email is already registered.
5. Hash the password using `bcrypt.hash()` with 10 salt rounds.
6. Create the user using `prisma.user.create()`.
7. Return `201` with the user's ID and email.

**Expected response (201):**

```json
{
  "id": 1,
  "email": "student@example.com"
}
```

Do not return the password or password hash.

## Task 2: Implement Login Endpoint

**File:** `src/server.js`

**Endpoint:** `POST /auth/login`

Implement an endpoint that verifies the user's credentials and generates a JWT.

**Request:**

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Requirements:**

1. Read `email` and `password` from `req.body`.
2. Return `400` if either value is not a string.
3. Find the user using `prisma.user.findUnique()`.
4. Verify the password using `bcrypt.compare()`.
5. Return `401` if the email or password is incorrect.
6. Generate a JWT using `jwt.sign()`.

The JWT payload must contain:

```javascript
{
  userId: user.id
}
```

Use the following configuration:

- Secret: `process.env.JWT_SECRET`
- Expiry: `15m`
- Algorithm: `HS256`

**Expected response (200):**

```json
{
  "accessToken": "your_generated_jwt"
}
```

## Task 3: Implement Authentication Middleware

**File:** `src/auth.js`

**Function:** `authenticateMiddleware(req, res, next)`

The starter project already contains protected routes that use this middleware.

Complete the middleware to verify whether an incoming request is authenticated.

**Requirements:**

1. Read the token from the `Authorization` header.
2. The expected format is `Bearer <token>`.
3. Return `401` if the token is missing or the format is invalid.
4. Verify the token using `jwt.verify()` with `process.env.JWT_SECRET`, accepting only `HS256`.
5. Return `401` if the token is invalid or expired.
6. Store the decoded payload in `req.user`.
7. Call `next()` if verification succeeds.

Once the middleware is implemented, authenticated users should be able to access the existing protected routes.

---

## Testing

Test the endpoints using Postman, Thunder Client, or curl.

| Scenario | Expected Status |
|---|---|
| Register a new user | 201 |
| Register duplicate email | 409 |
| Register with invalid input | 400 |
| Login with correct credentials | 200 |
| Login with incorrect password | 401 |
| Access `/public` without token | 200 |
| Access `/about` without token | 200 |
| Access `/profile` without token | 401 |
| Access `/dashboard` with invalid token | 401 |
| Access `/profile` with expired token | 401 |
| Access `/profile` with valid token | 200 |
| Access `/dashboard` with valid token | 200 |

### Testing Protected Routes

First, log in and copy the returned access token.

Send the token in the Authorization header:

```http
GET /profile
Authorization: Bearer <your_access_token>
```

Now remove the token and send the same request again.

Observe how the response changes.

## Expected Outcome

By the end of the lab, you should be able to:

- Register users with securely hashed passwords.
- Generate JWTs after successful login.
- Verify JWTs using authentication middleware.
- Understand the difference between public and protected routes.
- Protect multiple endpoints using the same middleware.

**Important:** Complete only the TODO sections in `src/server.js` and `src/auth.js`. Do not modify the existing public and protected endpoints.