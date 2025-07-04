import { api } from '../axios'
import type { SignupResponse } from '../../types'

export const signup = async (email: string, password: string, name: string) => {
  const { data } = await api.post<SignupResponse>('/auth/signup', { 
    email,
    password,
    name,
  })
  return data
}
