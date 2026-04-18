const router = require("express").Router()
const { addMoney } = require("../services/walletService")

let pool = []

router.post("/", async (req, res) => {
  const { userId, lat, lng } = req.body

  const now = Date.now()

  // remove old entries (10 seconds window)
  pool = pool.filter(u => now - u.time < 10000)

  // find nearby users
  const match = pool.find(u =>
    Math.abs(u.lat - lat) < 0.005 &&
    Math.abs(u.lng - lng) < 0.005 &&
    u.userId !== userId
  )

  if (match) {
    await addMoney(userId, 0.05)
    await addMoney(match.userId, 0.05)

    return res.json({ success: true, reward: 0.05 })
  }

  pool.push({ userId, lat, lng, time: now })

  res.json({ success: false })
})

module.exports = router
