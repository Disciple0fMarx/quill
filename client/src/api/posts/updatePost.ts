import type { Post } from "../../types"
import { api } from "../axios"

export const updatePost = async (
    slug: string,
    updates: {
        title?: string
        content?: string
        published?: boolean
    }
) => {
    try {
        const response = await api.patch<Post>(`/posts/${slug}`, updates, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
        return response.data
    } catch (err) {
        console.error('Update error: ', err)
        throw err
    }
}
