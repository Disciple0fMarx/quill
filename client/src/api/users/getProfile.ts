import { api } from "../axios"
import type { User } from "../../types"

export const getProfile = async () => {
  const { data } = await api.get<User>('/profile', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  return data
}
