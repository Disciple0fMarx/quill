import type { AuthorApplication } from "../../types"
import { api } from '../axios'

export const submitApplication = async (message: string): Promise<AuthorApplication> => {
    const response = await api.post<AuthorApplication>('applications/', { message }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    return response.data
}
