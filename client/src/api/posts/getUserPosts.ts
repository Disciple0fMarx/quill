import type { Post } from "../../types"
import { api } from "../axios"

export const getUserPosts = async () => {
  try {
    const response = await api.get<Post[]>('/posts/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    
    return response.data.map(post => ({
        ...post,
        author: post.author
      }))

  } catch (error) {
    console.error('Error fetching user posts:', error)
    throw error
  }
}
