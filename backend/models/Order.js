const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  products: Array,
  total: Number,
  status: { type: String, default: "pending" },
  trackingCode: String
}, { timestamps: true })

module.exports = mongoose.model("Order", OrderSchema)
