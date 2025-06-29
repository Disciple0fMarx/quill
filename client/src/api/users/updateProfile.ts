import type { User } from "../../types"
import { api } from "../axios"

export const updateProfile = async (updates: Partial<User>) => {
    const { data } = await api.patch<User>('/profile', updates, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
    return data
}
