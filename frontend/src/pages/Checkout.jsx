import React from 'react'
import api from '../api/client'
import { Card, CardContent, Typography, Button } from '@mui/material'

export default function Checkout() {
  const pay = async () => {
    const res = await api.post('/api/orders/create_from_cart/')
    alert(`Order #${res.data.id} placed. Amount: ₹${res.data.total_amount}`)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Checkout</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          This is a mock payment. Click **Pay Now** to place your order.
        </Typography>
        <Button onClick={pay}>Pay Now</Button>
      </CardContent>
    </Card>
  )
}
