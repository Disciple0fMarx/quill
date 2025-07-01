import { useEffect, useRef, useState } from 'react'
import { createPost as apiCreatePost, deletePost as apiDeletePost, getPosts, getPostBySlug, getUserPosts } from '../api/index'
import { useAuthContext } from '../context/AuthContext'
import type { Post } from '../types'

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthContext()

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await getPosts()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserPosts = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const data = await getUserPosts()
      setPosts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch your posts')
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData: {
    title: string
    content: string
    published?: boolean
  }) => {
    try {
      setLoading(true)
      const newPost: Post = await apiCreatePost(postData)
      setPosts(prev => [newPost, ...prev])
      return newPost
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (postId: string) => {
    try {
      setLoading(true)
      await apiDeletePost(postId)
      setPosts(prev => prev.filter(post => post.id !== postId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchUserPosts,
    createPost,
    deletePost,
  }
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const currentSlugRef = useRef<string | null>(null)

  useEffect(() => {
    if (!slug || slug === currentSlugRef.current) return

    currentSlugRef.current = slug
    setLoading(true)
    setError(null)

    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug)
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Post not found')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return {
    post,
    loading,
    error,
  }
}
