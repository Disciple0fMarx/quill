import { RequestHandler } from 'express'
import { prisma } from '../utils/prisma'
import type { AuthenticatedRequest } from '../types'
import DOMPurify from 'dompurify'
import { verifyAccessToken } from '../middleware/auth.middleware'

// Helper to generate slugs
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const generateUniqueSlug = async (title: string): Promise<string> => {
  let slug = generateSlug(title)
  let count = 0
  let uniqueSlug = slug

  while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
    count++
    uniqueSlug = `${slug}-${count}`
  }

  return uniqueSlug
}

export const createPostHandler: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const { title, content, published = false } = req.body

  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required" })
    return
  }

  const userId = req.userId
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user) {
      res.status(404).json({ error: "User not found" })
      return
    }

    if (user.role !== 'AUTHOR') {
      res.status(403).json({ error: "Only authors can create posts" })
      return
    }

    const cleanContent = DOMPurify.sanitize(content)

    const post = await prisma.post.create({
      data: {
        title,
        content: cleanContent,
        slug: await generateUniqueSlug(title),
        published,
        authorId: userId
      }
    })
    res.status(201).json(post)
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" })
    return
  }
}

export const getPostsHandler: RequestHandler = async (_req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } }
    })
    res.status(200).json(posts)
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" })
    return
  }
}

export const getUserPostsHandler: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const userId = req.userId

  try {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })
    res.status(200).json(posts)
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your posts" })
    return
  }
}

export const getPostBySlugHandler: RequestHandler = async (req, res) => {
  const { slug } = req.params

  if (!slug) {
    res.status(400).json({ error: "Slug is required" })
    return
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { 
        author: { 
          select: { 
            name: true,
            id: true
          } 
        } 
      }
    })

    if (!post) {
      res.status(404).json({ error: "Post not found" })
      return
    }

    if (post.published) {
      res.status(200).json(post)
      return
    }

    // If the post isn't published, check if the requester is the author
    verifyAccessToken(req, res, () => {
      const reqUserId = (req as AuthenticatedRequest).userId
      
      if (post.authorId !== reqUserId) {
        res.status(403).json({ error: "You don't have permission to view this post" })
        return
      }

      res.status(200).json(post)
      return
    })
    // if (!post.published) {
    //   const reqUserId = (req as AuthenticatedRequest).userId
    //   console.log('User ID: ', reqUserId)

    //   if (post.authorId !== reqUserId) {
    //     res.status(403).json({ error: "You don't have permission to view this post" })
    //     return
    //   }
    // }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" })
    return
  }
}

export const deletePostHandler: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const { postId } = req.params // Expecting postId as URL param
  const userId = req.userId // From authenticated middleware

  if (!postId) {
    res.status(400).json({ error: "Post ID is required" })
    return
  }

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  try {
    // First, verify the post exists and belongs to the user
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      res.status(404).json({ error: "Post not found" })
      return
    }

    if (post.authorId !== userId) {
      res.status(403).json({ error: "You can only delete your own posts" })
      return
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    })

    res.status(200).json({ message: "Post deleted successfully" })
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" })
    return
  }
}
