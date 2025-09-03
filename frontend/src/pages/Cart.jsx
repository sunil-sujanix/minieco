import React, { useEffect, useState } from 'react'
import api from '../api/client'
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody,
  TextField, IconButton, Stack, Typography, Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const [items, setItems] = useState([])
  const nav = useNavigate()

  const load = () => api.get('/api/cart/').then(res => setItems(res.data))
  useEffect(() => { load() }, [])

  const updateQty = async (id, quantity) => { await api.patch('/api/cart/' + id + '/', { quantity }); load() }
  const remove = async (id) => { await api.delete('/api/cart/' + id + '/'); load() }

  const total = items.reduce((s, it) => s + Number(it.product_detail.price) * it.quantity, 0)

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Your Cart</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(it => (
              <TableRow key={it.id}>
                <TableCell>{it.product_detail.title}</TableCell>
                <TableCell align="right">₹{it.product_detail.price}</TableCell>
                <TableCell align="center">
                  <TextField type="number" size="small" value={it.quantity}
                    onChange={e => updateQty(it.id, Math.max(1, parseInt(e.target.value || '1', 10)))}
                    inputProps={{ min: 1 }} sx={{ width: 90 }} />
                </TableCell>
                <TableCell align="right">₹{(Number(it.product_detail.price) * it.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => remove(it.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={5}><Typography align="center">Cart is empty.</Typography></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h5">Total: ₹{total.toFixed(2)}</Typography>
        <Button disabled={!items.length} onClick={() => nav('/checkout')}>Checkout</Button>
      </Stack>
    </>
  )
}
