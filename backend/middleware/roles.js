module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user

      // No authenticated user found
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" })
      }

      // No roles defined (safe fail)
      if (!allowedRoles || allowedRoles.length === 0) {
        return res.status(403).json({ error: "No roles allowed" })
      }

      // Check role permission
      const hasRole = allowedRoles.includes(user.role)

      if (!hasRole) {
        return res.status(403).json({
          error: "Access denied",
          role: user.role
        })
      }

      next()
    } catch (err) {
      console.error("Role middleware error:", err)
      return res.status(500).json({ error: "Server error" })
    }
  }
}
