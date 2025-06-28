import { api } from '../axios'

type SignupResponse = {
  accessToken: string
  refreshToken: string
}

export const signup = async (email: string, password: string) => {
  const { data } = await api.post<SignupResponse>('/signup', { 
    email, 
    password 
  })
  return data
}
