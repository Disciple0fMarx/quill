import { api } from '../axios'

type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export const login = async (email: string, password: string) => {
  const { data } = await api.post<LoginResponse>('/login', { 
    email, 
    password 
  })
  return data
}
