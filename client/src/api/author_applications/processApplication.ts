import type { AuthorApplication } from "../../types"
import { api } from '../axios'

export const processApplication = async (
    applicationId: string,
    action: 'APPROVED' | 'REJECTED',
    userId: string,
    notes?: string
): Promise<AuthorApplication> => {
    const response = await api.patch<AuthorApplication>(
        `/applications/${applicationId}/process`,
        { action, userId, notes },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    )

    return response.data
}