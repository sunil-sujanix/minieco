import React, { useEffect, useState } from 'react'
import api from '../api/client'
import { Paper, Stack, TextField, Button, Typography, Divider } from '@mui/material'

export default function AdminProducts() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', description: '', price: 0, stock: 0, category: null })
  const load = () => api.get('/api/products/').then(res => setItems(res.data))
  useEffect(() => { load() }, [])
  const create = async () => { await api.post('/api/products/', form); setForm({ title: '', description: '', price: 0, stock: 0, category: null }); load() }
  const remove = async (id) => { await api.delete('/api/products/' + id + '/'); load() }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Admin · Products</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <TextField label="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
          <TextField label="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
          <Button onClick={create}>Create</Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        {items.map(p => (
          <React.Fragment key={p.id}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
              <Typography>{p.title} — ₹{p.price}</Typography>
              <Button color="error" onClick={() => remove(p.id)}>Delete</Button>
            </Stack>
            <Divider />
          </React.Fragment>
        ))}
        {!items.length && <Typography sx={{ py: 2 }} color="text.secondary">No products yet.</Typography>}
      </Paper>
    </>
  )
}
