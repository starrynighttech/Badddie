const router = require("express").Router()
const User = require("../models/User")
const Order = require("../models/Order")
const Wallet = require("../models/Wallet")

router.get("/users", async (req, res) => {
  res.json(await User.find())
})

router.get("/orders", async (req, res) => {
  res.json(await Order.find())
})

router.get("/wallets", async (req, res) => {
  res.json(await Wallet.find())
})

router.post("/block-user", async (req, res) => {
  const { userId } = req.body
  await User.findByIdAndUpdate(userId, { blocked: true })
  res.json({ success: true })
})

module.exports = router
