const router = require("express").Router()
const Ad = require("../models/Ad")
const { addMoney } = require("../services/walletService")

router.get("/", async (req, res) => {
  res.json(await Ad.find())
})

router.post("/reward", async (req, res) => {
  const { userId, reward } = req.body

  await addMoney(userId, reward)

  res.json({ success: true })
})

module.exports = router
