import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Orders() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    api.get('/api/orders/').then(res => setOrders(res.data))
  }, [])
  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
          <div>Order #{o.id} — {o.status} — ₹{o.total_amount}</div>
          <div>Items: {o.items?.length || 0}</div>
        </div>
      ))}
    </div>
  )
}
