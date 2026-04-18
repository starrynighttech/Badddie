const mongoose = require("mongoose")

module.exports = mongoose.model("Tracking", {
  externalCode: String,
  internalCode: String,
  status: String,
  updates: Array
})
