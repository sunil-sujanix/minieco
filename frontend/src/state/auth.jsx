import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/client'

const AuthCtx = createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) setUser(JSON.parse(data))
  }, [])

  const login = async (username, password) => {
    const { data } = await api.post('/api/auth/token/', { username, password })
    localStorage.setItem('token', data.access)
    // simple profile stub:
    setUser({ username })
    localStorage.setItem('user', JSON.stringify({ username }))
  }
  const signup = async (username, email, password) => {
    await api.post('/api/auth/register/', { username, email, password })
    return login(username, password)
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }
  return <AuthCtx.Provider value={{ user, login, signup, logout }}>{children}</AuthCtx.Provider>
}
export const useAuth = () => useContext(AuthCtx)
