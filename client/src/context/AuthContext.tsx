// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from '../utils/cookies'

type AuthContextType = {
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })

  // Add request interceptor to inject token
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  // Add response interceptor to handle token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        await refreshToken()
        return api(originalRequest)
      }
      return Promise.reject(error)
    }
  )

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })
    setAccessToken(data.accessToken)
    setCookie('refreshToken', data.refreshToken, { 
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 
    })
  }

  const signup = async (email: string, password: string, name?: string) => {
    const { data } = await api.post('/auth/signup', { email, password, name })
    setAccessToken(data.accessToken)
    setCookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    })
  }

  const logout = async () => {
    const refreshToken = getCookie('refreshToken')
    await api.post('/auth/logout', { refreshToken })
    setAccessToken(null)
    deleteCookie('refreshToken')
  }

  const refreshToken = async () => {
    const refreshToken = getCookie('refreshToken')
    const { data } = await api.post('/auth/refresh-token', { refreshToken })
    setAccessToken(data.accessToken)
    setCookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    })
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, signup, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
