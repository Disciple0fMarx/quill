import type { PaginatedResult, Post } from "../../types"
import { api } from "../axios"

export const getUserPosts = async (page: number = 1, limit: number = 10) => {
  try {
    // const response = await api.get<Post[]>('/posts/user', {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //   },
    // })

    const response = await api.get<PaginatedResult<Post>>('/posts/user', {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    return response.data
    
    // return response.data.map(post => ({
    //     ...post,
    //     author: post.author
    //   }))

  } catch (error) {
    console.error('Error fetching user posts:', error)
    throw error
  }
}
