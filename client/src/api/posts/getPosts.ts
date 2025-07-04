import type { PaginatedResult, Post } from "../../types"
import { api } from "../axios"

export const getPosts = async (page: number = 1, limit: number = 10) => {
  // const response = await api.get<Post[]>('/posts/all')
  // return response.data
  try {
    const response = await api.get<PaginatedResult<Post>>('/posts/all', {
      params: { page, limit },

    })
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}
