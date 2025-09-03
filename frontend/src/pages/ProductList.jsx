import React, { useEffect, useState } from 'react'
import api from '../api/client'
import { Grid, Typography, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ProductCard from './ProductCard'
export default function ProductList() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    api.get('/api/products/').then(res => setItems(res.data))
  }, [])

  const filtered = items.filter(x =>
    x.title.toLowerCase().includes(q.toLowerCase()) ||
    (x.description || '').toLowerCase().includes(q.toLowerCase())
  )

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Products</Typography>
      <TextField
        value={q} onChange={e => setQ(e.target.value)} placeholder="Search products…"
        fullWidth sx={{ mb: 3 }} InputProps={{
          startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)
        }}
      />
      <Grid container spacing={2}>
        {filtered.map(p => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
