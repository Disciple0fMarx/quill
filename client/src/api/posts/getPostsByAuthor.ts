import type { PaginatedResult, Post } from "../../types"
import { api } from "../axios"

export const getPostsByAuthor = async (authorId: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get<PaginatedResult<Post>>(`/posts/user/${authorId}`, {
      params: { page, limit },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching posts by author:', error)
    throw error
  }
}
