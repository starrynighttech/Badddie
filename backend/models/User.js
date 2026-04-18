const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin", "business"],
      default: "user"
    },

    blocked: {
      type: Boolean,
      default: false
    },

    // 🔗 Referral system
    referralCode: {
      type: String,
      unique: true,
      index: true
    },

    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    referrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    referralEarnings: {
      type: Number,
      default: 0
    },

    referralPaid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

/**
 * 🔥 Generate referral code automatically
 */
UserSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
  }
  next()
})

module.exports = mongoose.model("User", UserSchema)
