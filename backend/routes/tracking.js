const router = require("express").Router()
const Tracking = require("../models/Tracking")

router.post("/create", async (req, res) => {
  const { externalCode } = req.body

  const internalCode = "SN-" + Date.now()

  const tracking = await Tracking.create({
    externalCode,
    internalCode,
    status: "created",
    updates: []
  })

  res.json(tracking)
})

router.get("/:code", async (req, res) => {
  const tracking = await Tracking.findOne({
    internalCode: req.params.code
  })

  res.json(tracking)
})

module.exports = router
