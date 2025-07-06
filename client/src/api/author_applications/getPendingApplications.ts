import type { AuthorApplication } from "../../types"
import { api } from '../axios'

export const getPendingApplications = async (): Promise<AuthorApplication[]> => {
    const response = await api.get<AuthorApplication[]>('/applications/pending', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    return response.data
}
