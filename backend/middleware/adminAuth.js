const crypto = require("crypto")

// Load secret from environment variables (recommended)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" })
  }

  // Support both:
  // "Bearer token" OR "token"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader

  // Ensure server is configured correctly
  if (!ADMIN_TOKEN) {
    console.error("ADMIN_TOKEN is not set in environment variables")
    return res.status(500).json({ error: "Server misconfigured" })
  }

  try {
    // Secure comparison (prevents timing attacks)
    const valid =
      token.length === ADMIN_TOKEN.length &&
      crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(ADMIN_TOKEN)
      )

    if (!valid) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    next()
  } catch (err) {
    return res.status(403).json({ error: "Unauthorized" })
  }
}
