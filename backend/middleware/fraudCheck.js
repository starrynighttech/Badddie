let userActions = {}

module.exports = (req, res, next) => {
  const userId = req.body.userId

  if (!userId) return next()

  const now = Date.now()

  if (!userActions[userId]) {
    userActions[userId] = []
  }

  userActions[userId] = userActions[userId].filter(
    t => now - t < 10000
  )

  if (userActions[userId].length > 5) {
    return res.status(429).json({ error: "Suspicious activity" })
  }

  userActions[userId].push(now)
  next()
}
