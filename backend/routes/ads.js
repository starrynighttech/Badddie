const router = require("express").Router()
const Ad = require("../models/Ad")
const Reward = require("../models/Reward")
const { addMoney } = require("../services/walletService")

// GET all ads
router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find()
    res.json(ads)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to load ads" })
  }
})

/**
 * POST /reward
 * Body: { userId, adId }
 * Safe reward system (prevents cheating + duplicates)
 */
router.post("/reward", async (req, res) => {
  const { userId, adId } = req.body

  try {
    // 1. Validate ad exists
    const ad = await Ad.findById(adId)
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" })
    }

    // 2. Prevent duplicate rewards
    const existing = await Reward.findOne({ userId, adId })
    if (existing) {
      return res.status(400).json({ error: "Already rewarded" })
    }

    // 3. Save reward record (ledger system)
    await Reward.create({
      userId,
      adId,
      amount: ad.rewardAmount
    })

    // 4. Pay user from server-controlled value
    await addMoney(userId, ad.rewardAmount)

    res.json({ success: true, reward: ad.rewardAmount })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
