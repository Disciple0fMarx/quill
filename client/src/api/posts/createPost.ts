import type { Post } from "../../types"
import { api } from "../axios"

export const createPost = async (postData: {
  title: string
  content: string
  published?: boolean
}) => {
  const response = await api.post<Post>('/posts/create', postData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  return response.data
}
