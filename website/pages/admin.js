import { useEffect, useState } from "react"

const API = "https://YOUR-BACKEND/api"

export default function Admin() {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch(`${API}/admin/users`).then(r => r.json()).then(setUsers)
    fetch(`${API}/admin/orders`).then(r => r.json()).then(setOrders)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <h2>Users</h2>
      {users.map(u => (
        <div key={u._id}>{u.email}</div>
      ))}

      <h2>Orders</h2>
      {orders.map(o => (
        <div key={o._id}>
          {o.trackingCode} - {o.status}
        </div>
      ))}
    </div>
  )
}
