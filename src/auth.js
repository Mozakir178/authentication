const jwt = require("jsonwebtoken");

function authenticateMiddleware(req, res, next) {
  // TODO (Task 3): Implement JWT authentication.
  // 1. Read the Authorization header (expected: Bearer <token>).
  // 2. Return 401 if it is missing or malformed.
  // 3. Verify the token using jwt.verify(), process.env.JWT_SECRET,
  //    and the HS256 algorithm.
  // 4. Return 401 if the token is invalid or expired.
  // 5. Assign the decoded payload to req.user.
  // 6. Call next() when verification succeeds.

  return res.status(501).json({ message: "TODO: Implement authentication middleware" });
}

module.exports = { authenticateMiddleware };
