const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin", "business"],
    default: "user"
  },
  blocked: { type: Boolean, default: false }
})

module.exports = mongoose.model("User", UserSchema)
