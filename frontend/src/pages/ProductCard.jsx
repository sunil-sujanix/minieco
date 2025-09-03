import React from 'react'
import { Card, CardContent, CardActions, Typography, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {product.category ?? 'General'}
        </Typography>
        <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>{product.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
          {product.description || 'No description.'}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1.5 }}>₹{product.price}</Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ px: 1, pb: 1 }}>
          <Button component={Link} to={`/product/${product.id}`} size="small">View</Button>
        </Stack>
      </CardActions>
    </Card>
  )
}
