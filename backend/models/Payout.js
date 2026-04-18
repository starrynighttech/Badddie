const mongoose = require("mongoose")

module.exports = mongoose.model("Payout", {
  userId: String,
  amount: Number,
  status: { type: String, default: "pending" },
  method: String
})
