const router = require("express").Router()
const Order = require("../models/Order")

router.post("/", async (req, res) => {
  const order = new Order({
    ...req.body,
    trackingCode: "TRK" + Date.now()
  })

  await order.save()
  res.json(order)
})

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
  res.json(order)
})

module.exports = router
