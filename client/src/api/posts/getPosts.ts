import type { Post } from "../../types"
import { api } from "../axios"

export const getPosts = async () => {
  const response = await api.get<Post[]>('/posts/all')
  return response.data
}
