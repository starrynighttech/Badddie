const router = require("express").Router()
const Payout = require("../models/Payout")
const Wallet = require("../models/Wallet")

router.post("/request", async (req, res) => {
  const { userId, amount } = req.body

  const wallet = await Wallet.findOne({ userId })

  if (!wallet || wallet.balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" })
  }

  wallet.balance -= amount
  await wallet.save()

  const payout = await Payout.create({
    userId,
    amount,
    method: "mobile_money"
  })

  res.json(payout)
})

router.get("/", async (req, res) => {
  res.json(await Payout.find())
})

module.exports = router
