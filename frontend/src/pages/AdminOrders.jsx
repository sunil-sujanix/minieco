import React, { useEffect, useState } from 'react'
import api from '../api/client'
import { Paper, Typography, Divider, Stack } from '@mui/material'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  useEffect(() => { api.get('/api/orders/').then(res => setOrders(res.data)) }, [])
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Admin · Orders</Typography>
      <Paper sx={{ p: 2 }}>
        {orders.map(o => (
          <React.Fragment key={o.id}>
            <Stack direction="row" justifyContent="space-between" sx={{ py: 1.5 }}>
              <Typography>Order #{o.id}</Typography>
              <Typography color="text.secondary">{o.status} — ₹{o.total_amount}</Typography>
            </Stack>
            <Divider />
          </React.Fragment>
        ))}
        {!orders.length && <Typography sx={{ py: 2 }} color="text.secondary">No orders yet.</Typography>}
      </Paper>
    </>
  )
}
