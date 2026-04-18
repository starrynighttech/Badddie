const mongoose = require("mongoose")

module.exports = mongoose.model("Ad", {
  videoUrl: String,
  reward: Number,
  advertiser: String
})
