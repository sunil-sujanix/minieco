import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/auth.jsx'
import { AppBar, Toolbar, Typography, Container, Stack, Button, IconButton, Box } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StorefrontIcon from '@mui/icons-material/Storefront'

export default function Layout() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} color="inherit" sx={{ borderBottom: '1px solid #eee' }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton color="primary" onClick={() => nav('/')}>
            <StorefrontIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>MiniEcom</Typography>
          <Stack direction="row" spacing={1}>
            <Button component={Link} to="/">Products</Button>
            <Button startIcon={<ShoppingCartIcon />} component={Link} to="/cart">Cart</Button>
            <Button component={Link} to="/orders">Orders</Button>
            <Button component={Link} to="/admin/products">Admin</Button>
            {user ? (
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" disableElevation>{user.username}</Button>
                <Button color="secondary" onClick={logout}>Logout</Button>
              </Stack>
            ) : (
              <>
                <Button component={Link} to="/login">Login</Button>
                <Button color="secondary" component={Link} to="/signup">Signup</Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 4, borderTop: '1px solid #eee', mt: 6, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">© {new Date().getFullYear()} MiniEcom — Built with Django & React</Typography>
      </Box>
    </Box>
  )
}
