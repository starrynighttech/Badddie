const router = require("express").Router()
const Paynow = require("paynow")

const paynow = new Paynow(
  process.env.PAYNOW_ID,
  process.env.PAYNOW_KEY
)

router.post("/", async (req, res) => {
  const { amount, email } = req.body

  const payment = paynow.createPayment("Order Payment", email)
  payment.add("Products", amount)

  const response = await paynow.send(payment)

  if (response.success) {
    res.json({ url: response.redirectUrl })
  } else {
    res.status(400).json({ error: "Payment failed" })
  }
})

module.exports = router
