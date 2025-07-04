import { api } from '../axios'

export const refreshToken = async (token: string) => {
  const { data } = await api.post('/auth/refresh-token', { 
    refreshToken: token 
  })
  return data
}
