require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { authenticateMiddleware } = require("./auth");

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
  throw new Error("DATABASE_URL and JWT_SECRET must be set in .env");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const app = express();
app.use(express.json());

// TASK 1: Register a user (TODO)
app.post("/auth/register", async (req, res) => {
  // 1. Read email and password from req.body.
  // 2. Validate: email is a string containing "@"; password is a string
  //    with at least 8 characters. Return 400 for invalid input.
  // 3. Check existing email using prisma.user.findUnique(). Return 409 if found.
  // 4. Hash password using bcrypt.hash(password, 10).
  // 5. Create the user using prisma.user.create().
  // 6. Return 201 with only { id, email }, never password or password hash.
  return res.status(501).json({ message: "TODO: Implement registration" });
});

// TASK 2: Log in and issue a JWT (TODO)
app.post("/auth/login", async (req, res) => {
  // 1. Read email and password; return 400 if either is not a string.
  // 2. Look up user using prisma.user.findUnique().
  // 3. Check the password with bcrypt.compare(); return 401 if incorrect.
  // 4. Sign a token with jwt.sign():
  //    Payload: { userId: user.id }
  //    Secret: process.env.JWT_SECRET
  //    Options: { expiresIn: "15m", algorithm: "HS256" }
  // 5. Return 200 with { accessToken }.
  return res.status(501).json({ message: "TODO: Implement login" });
});

// PUBLIC ROUTES: Already implemented; do not modify.
app.get("/public", (req, res) => {
  res.status(200).json({ message: "This is a public route" });
});

app.get("/about", (req, res) => {
  res.status(200).json({ message: "This application demonstrates JWT authentication" });
});

// PROTECTED ROUTES: Already implemented; do not modify.
app.get("/profile", authenticateMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error loading profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/dashboard", authenticateMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Welcome to your dashboard",
    userId: req.user.userId,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
