import { useEffect, useState } from "react"

const API = "https://YOUR-BACKEND/api"

export default function Analytics() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`${API}/analytics`)
      .then(r => r.json())
      .then(setData)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Analytics</h1>
      <p>Users: {data.users}</p>
      <p>Orders: {data.orders}</p>
      <p>Revenue: ${data.revenue}</p>
    </div>
  )
}
