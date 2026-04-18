const router = require("express").Router()
const User = require("../models/User")
const Order = require("../models/Order")
const Wallet = require("../models/Wallet")

router.get("/", async (req, res) => {
  const users = await User.countDocuments()
  const orders = await Order.countDocuments()

  const revenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$total" } } }
  ])

  const revenue = revenueAgg[0]?.total || 0

  res.json({
    users,
    orders,
    revenue
  })
})

module.exports = router
