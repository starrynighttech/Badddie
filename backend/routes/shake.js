const router = require("express").Router()
const Redis = require("ioredis")
const { addMoney } = require("../services/walletService")

const redis = new Redis(process.env.REDIS_URL)

// CONFIG
const REWARD = 0.05
const MATCH_WINDOW = 10 // seconds
const COOLDOWN = 10 // seconds
const DISTANCE_LIMIT_KM = 0.5 // 500 meters

// --------------------
// Haversine formula (real GPS distance)
// --------------------
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2

  return 2 * R * Math.asin(Math.sqrt(a))
}

// --------------------
// Main route
// --------------------
router.post("/", async (req, res) => {
  try {
    const { userId, lat, lng } = req.body

    if (!userId || lat == null || lng == null) {
      return res.status(400).json({ success: false, message: "Invalid request" })
    }

    const now = Date.now()

    // --------------------
    // 1. Cooldown check (anti-spam)
    // --------------------
    const cooldownKey = `shake:cooldown:${userId}`
    const last = await redis.get(cooldownKey)

    if (last && now - parseInt(last) < COOLDOWN * 1000) {
      return res.json({ success: false, message: "Cooldown active" })
    }

    await redis.set(cooldownKey, now, "EX", COOLDOWN)

    // --------------------
    // 2. Try to find match
    // --------------------
    const poolKey = "shake:pool"
    const poolRaw = await redis.lrange(poolKey, 0, -1)

    let match = null
    let matchIndex = -1

    for (let i = 0; i < poolRaw.length; i++) {
      const u = JSON.parse(poolRaw[i])

      if (u.userId === userId) continue

      const distance = getDistanceKm(lat, lng, u.lat, u.lng)

      if (distance <= DISTANCE_LIMIT_KM) {
        match = u
        matchIndex = i
        break
      }
    }

    // --------------------
    // 3. If match found → atomic reward + cleanup
    // --------------------
    if (match) {
      // remove matched user from pool
      await redis.lrem(poolKey, 1, JSON.stringify(match))

      // reward both users
      await Promise.all([
        addMoney(userId, REWARD),
        addMoney(match.userId, REWARD)
      ])

      return res.json({
        success: true,
        reward: REWARD,
        matched: true
      })
    }

    // --------------------
    // 4. No match → add to pool
    // --------------------
    const userEntry = JSON.stringify({
      userId,
      lat,
      lng,
      time: now
    })

    await redis.rpush(poolKey, userEntry)

    // auto-expire pool entries after window
    await redis.expire(poolKey, MATCH_WINDOW)

    return res.json({
      success: false,
      message: "Searching for nearby users"
    })

  } catch (err) {
    console.error("Shake error:", err)
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
})

module.exports = router
