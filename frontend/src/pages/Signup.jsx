import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/auth.jsx'
import {
  Box, Card, CardContent, TextField, Typography, Button,
  IconButton, InputAdornment, Snackbar, Alert, Stack
} from '@mui/material'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function Signup() {
  const { signup } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState({ open: false, msg: '', sev: 'success' })

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.email || !form.password) {
      return setToast({ open: true, msg: 'Please fill all fields', sev: 'warning' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return setToast({ open: true, msg: 'Enter a valid email', sev: 'warning' })
    }
    try {
      setBusy(true)
      await signup(form.username, form.email, form.password)
      setToast({ open: true, msg: 'Account created! 🎉', sev: 'success' })
      setTimeout(() => nav('/'), 500)
    } catch (err) {
      setToast({ open: true, msg: 'Sign up failed', sev: 'error' })
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
      <Card sx={{ width: 480, boxShadow: '0 18px 55px rgba(0,0,0,0.08)', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Create account ✨</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Join MiniEcom in seconds</Typography>

          <form onSubmit={submit}>
            <Stack spacing={2.2}>
              <TextField
                label="Username"
                value={form.username}
                onChange={onChange('username')}
                fullWidth
              />
              <TextField
                label="Email"
                value={form.email}
                onChange={onChange('email')}
                type="email"
                fullWidth
              />
              <TextField
                label="Password"
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={onChange('password')}
                fullWidth
                helperText="Min 6–8 characters recommended"
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
                startIcon={<AppRegistrationIcon />}
                disabled={busy}
                size="large"
              >
                {busy ? 'Creating…' : 'Create account'}
              </Button>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Already have an account? <Button component={Link} to="/login" size="small">Sign in</Button>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
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
