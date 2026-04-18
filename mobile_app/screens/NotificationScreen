import { useEffect, useState } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { API } from "../services/api"

export default function Notifications({ userId }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true)

        const res = await fetch(`${API}/notifications/${userId}`)
        const data = await res.json()

        setNotes(data)
      } catch (err) {
        setError("Failed to load notifications")
      } finally {
        setLoading(false)
      }
    }

    if (userId) loadNotifications()
  }, [userId])

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    )
  }

  return (
    <View>
      {notes.map(n => (
        <Text key={n._id}>{n.message}</Text>
      ))}
    </View>
  )
}
