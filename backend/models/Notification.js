const mongoose = require("mongoose")

module.exports = mongoose.model("Notification", {
  userId: String,
  message: String,
  read: { type: Boolean, default: false }
})
