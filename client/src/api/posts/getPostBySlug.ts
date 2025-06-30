import type { Post } from "../../types"
import { api } from "../axios"

export const getPostBySlug = async (slug: string) => {
  const response = await api.get<Post>(`/posts/${slug}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  return response.data
}
