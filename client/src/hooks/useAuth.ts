import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup, logout as apiLogout } from '../api/index'
import { api } from '../api/axios'
import { getCookie, setCookie, deleteCookie } from '../utils/cookies'
import type { User } from '../types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const navigate = useNavigate()

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      if (isInitialized) return

      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = getCookie('refreshToken')
        if (!accessToken || !refreshToken) throw new Error('Missing tokens')
        // if (!accessToken || !refreshToken) throw new Error('Missing tokens')
        
        if (!user) {
          const { data } = await api.get<User>('/me')
          setUser(data)
        }
        setIsInitialized(true)
      } catch {
        await clearAuth()
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

  const clearAuth = useCallback(async () => {
    localStorage.removeItem('accessToken')
    deleteCookie('refreshToken')
    setUser(null)
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const { accessToken, refreshToken, user } = await login(email, password)
      localStorage.setItem('accessToken', accessToken)
      setCookie('refreshToken', refreshToken, { 
        path: '/', 
        'max-age': 7 * 24 * 60 * 60 
      })

      const normalizedUser: User = {
      id: user.id,
      email: user.email,
      name: user.name ?? null, // Convert undefined to null
      role: user.role, // Must be present
      ...(user.createdAt && { createdAt: user.createdAt }) // Optional spread
    }
      
      // const { data: user } = await api.get<User>('/me')
      setUser(normalizedUser)
      navigate('/dashboard')
    } catch (error) {
      await clearAuth()
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [navigate, clearAuth, isLoading])

  const handleSignup = useCallback(async (email: string, password: string, name: string) => {
    if (isLoading) {
      return
    }

    try {
      setIsLoading(true)
      const { accessToken, refreshToken } = await signup(email, password, name)
      localStorage.setItem('accessToken', accessToken)
      setCookie('refreshToken', refreshToken, { 
        path: '/', 
        'max-age': 7 * 24 * 60 * 60 
      })
      
      const { data: user } = await api.get<User>('/me')

      if (!user?.id) throw new Error('Invalid user data')
      
      const normalizedUser = {
        id: user.id,
        email: user.email,
        name: user.name ?? null,
        role: user.role || 'READER' // Default role
      }

      setUser(normalizedUser)
      navigate('/dashboard')
    } catch (error) {
      await clearAuth()
      console.error('Signup error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [navigate, clearAuth, isLoading])

  const logout = useCallback(async () => {
    try {
      await apiLogout()
    } finally {
      await clearAuth()
      navigate('/login')
    }
  }, [navigate, clearAuth])

  return { 
    user, 
    isLoading, 
    login: handleLogin, 
    signup: handleSignup, 
    logout 
  }
}
