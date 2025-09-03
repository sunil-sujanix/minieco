import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/client'
import { Card, CardContent, Typography, Stack, TextField, Button, Divider } from '@mui/material'

export default function ProductDetail() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => { api.get('/api/products/' + id + '/').then(res => setP(res.data)) }, [id])

  const addToCart = async () => {
    await api.post('/api/cart/', { product: p.id, quantity: qty })
    alert('Added to cart')
  }

  if (!p) return <Typography>Loading…</Typography>

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{p.title}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>{p.description || 'No description.'}</Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5">₹{p.price}</Typography>
          <TextField
            type="number" size="small" label="Qty" inputProps={{ min: 1 }}
            value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value || '1', 10)))}
            sx={{ width: 120 }}
          />
          <Button onClick={addToCart}>Add to Cart</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
