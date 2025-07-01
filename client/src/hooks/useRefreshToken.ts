import { useEffect } from 'react'
import { refreshToken } from '../api/auth/refreshToken'
import { getCookie, setCookie } from '../utils/cookies'

export function useRefreshToken() {
  const refresh = async () => {
    try {
      const refreshTokenValue = getCookie('refreshToken')
      if (!refreshTokenValue) return null

      const { accessToken, refreshToken: newRefreshToken } = 
        await refreshToken(refreshTokenValue)

      localStorage.setItem('accessToken', accessToken)
      setCookie('refreshToken', newRefreshToken, { 
        path: '/', 
        'max-age': 7 * 24 * 60 * 60 
      })
      return accessToken
    } catch {
      return null
    }
  }

  // Setup refresh interval (10 minutes)
  useEffect(() => {
    const interval = setInterval(refresh, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { refresh }
}
