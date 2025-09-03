import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/auth.jsx'
import {
  Box, Card, CardContent, TextField, Typography, Button,
  IconButton, InputAdornment, Snackbar, Alert, Stack
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoginIcon from '@mui/icons-material/Login'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState({ open: false, msg: '', sev: 'success' })

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      return setToast({ open: true, msg: 'Please fill all fields', sev: 'warning' })
    }
    try {
      setBusy(true)
      await login(form.username, form.password)
      setToast({ open: true, msg: 'Welcome back! 🎉', sev: 'success' })
      setTimeout(() => nav('/'), 400)
    } catch (err) {
      setToast({ open: true, msg: 'Invalid credentials', sev: 'error' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '70vh',
      display: 'grid',
      placeItems: 'center',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #eef6ff 100%)',
      borderRadius: 2
    }}>
      <Card sx={{ width: 420, boxShadow: '0 18px 55px rgba(0,0,0,0.08)', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Welcome 👋</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Log in to continue</Typography>

          <form onSubmit={submit}>
            <Stack spacing={2.2}>
              <TextField
                label="Username"
                value={form.username}
                onChange={onChange('username')}
                autoFocus
                fullWidth
              />
              <TextField
                label="Password"
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={onChange('password')}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw(s => !s)} edge="end">
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                startIcon={<LoginIcon />}
                disabled={busy}
                size="large"
              >
                {busy ? 'Signing in…' : 'Sign in'}
              </Button>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                New here? <Button component={Link} to="/signup" size="small">Create an account</Button>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.sev} variant="filled" sx={{ width: '100%' }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}
