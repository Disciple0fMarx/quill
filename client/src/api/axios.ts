import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refreshToken='))
        ?.split('=')[1]
      
      if (!refreshToken) throw error
      
      try {
        const { data } = await api.post('/refresh-token', { refreshToken })
        localStorage.setItem('accessToken', data.accessToken)
        document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${7*24*60*60}`
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (_) {
        localStorage.removeItem('accessToken')
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        throw error
      }
    }
    throw error
  }
)
