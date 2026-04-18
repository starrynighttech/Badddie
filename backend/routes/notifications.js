const router = require("express").Router()
const Notification = require("../models/Notification")

router.get("/:userId", async (req, res) => {
  const notes = await Notification.find({ userId: req.params.userId })
  res.json(notes)
})

router.post("/", async (req, res) => {
  const note = await Notification.create(req.body)
  res.json(note)
})

module.exports = router
