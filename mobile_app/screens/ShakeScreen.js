import { Accelerometer } from "expo-sensors"
import * as Location from "expo-location"
import { useEffect } from "react"
import { API } from "../services/api"

export default function ShakeScreen() {
  useEffect(() => {
    let lastShake = 0

    Accelerometer.addListener(async data => {
      const total = Math.abs(data.x + data.y + data.z)

      if (total > 2.3 && Date.now() - lastShake > 3000) {
        lastShake = Date.now()

        const loc = await Location.getCurrentPositionAsync({})

        fetch(`${API}/shake`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "USER_ID",
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
          })
        })
      }
    })
  }, [])

  return null
}
