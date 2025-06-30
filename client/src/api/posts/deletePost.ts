import { api } from '../axios'
import { AxiosError } from 'axios'

export const deletePost = async (postId: string): Promise<void> => {
  try {
    await api.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Handle Axios-specific errors
      switch (error.response?.status) {
        case 401:
          throw new Error('Unauthorized: Please log in')
        case 403:
          throw new Error('Forbidden: You cannot delete this post')
        case 404:
          throw new Error('Post not found')
        default:
          throw new Error(error.response?.data?.message || 'Failed to delete post')
      }
    }
    // Handle non-Axios errors
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
  }
}
