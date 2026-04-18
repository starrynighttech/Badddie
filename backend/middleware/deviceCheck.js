const blockedDevices = new Set()

module.exports = (req, res, next) => {
  const deviceId = req.headers["x-device-id"]

  if (!deviceId) {
    return res.status(400).json({ error: "No device ID" })
  }

  if (blockedDevices.has(deviceId)) {
    return res.status(403).json({ error: "Device blocked" })
  }

  req.deviceId = deviceId
  next()
}
