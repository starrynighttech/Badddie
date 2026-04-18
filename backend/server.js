require("dotenv").config()

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const connectDB = require("./config/db")

// Middleware
const rateLimiter = require("./middleware/rateLimiter")
const deviceCheck = require("./middleware/deviceCheck")
const fraudCheck = require("./middleware/fraudCheck")

// Routes
const adminRoutes = require("./routes/admin")
const analyticsRoutes = require("./routes/analytics")
const payoutsRoutes = require("./routes/payouts")
const notificationsRoutes = require("./routes/notifications")
const productsRoutes = require("./routes/products")
const ordersRoutes = require("./routes/orders")
const paymentsRoutes = require("./routes/payments")

const app = express()

// ======================
// DB CONNECTION
// ======================
connectDB()

// ======================
// CORE MIDDLEWARE
// ======================
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}))

app.use(express.json())
app.use(morgan("dev"))

// ======================
// SECURITY MIDDLEWARE (ORDER MATTERS)
// ======================
app.use(rateLimiter)
app.use(deviceCheck)
app.use(fraudCheck)

// ======================
// ROUTES
// ======================

// Core business routes
app.use("/api/products", productsRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/payments", paymentsRoutes)

// System modules
app.use("/api/admin", adminRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/payouts", payoutsRoutes)
app.use("/api/notifications", notificationsRoutes)

// Health check
app.get("/", (req, res) => {
  res.send("🚀 API running successfully")
})

// ======================
// ERROR HANDLING
// ======================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack)
  res.status(500).json({
    message: "Internal Server Error"
  })
})

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`)
})

// ======================
// SAFETY NET
// ======================
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message)
  process.exit(1)
})

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message)
  process.exit(1)
})
