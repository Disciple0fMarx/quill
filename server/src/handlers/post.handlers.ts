import { RequestHandler } from 'express'
import { prisma } from '../utils/prisma'
import type { AuthenticatedRequest } from '../types'
import { verifyAccessToken } from '../middleware/auth.middleware'
import { isAdmin } from '../utils/adminCheck'
import { paginate } from '../utils/pagination'

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

    if (user.role === 'READER') {
      res.status(403).json({ error: "Only authors can create posts" })
      return
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
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

export const getPostsHandler: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const result = await paginate(
      prisma.post,
      {
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } }
      },
      {
        page: Number(page),
        limit: Number(limit),
      }
    )

    res.status(200).json(result)
    return

    // const posts = await prisma.post.findMany({
    //   where: { published: true },
    //   orderBy: { createdAt: 'desc' },
    //   include: { author: { select: { name: true } } }
    // })
    // res.status(200).json(posts)
    // return
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" })
    return
  }
}

export const getUserPostsHandler: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const userId = req.userId

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  try {
    const { page = 1, limit = 10 } = req.query
    const result = await paginate(
      prisma.post,
      {
        where: { authorId: userId },
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              name: true,
              id: true
            }
          }
        },
      },
      {
        page: Number(page),
        limit: Number(limit),
      }
    )

    res.status(200).json(result)
    return

    // const posts = await prisma.post.findMany({
    //   where: { authorId: userId },
    //   orderBy: { createdAt: 'desc' },
    //   include: {
    //     author: {
    //       select: {
    //         name: true,
    //         id: true
    //       }
    //     }
    //   }
    // })
    // res.status(200).json(posts)
    // return
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your posts" })
    return
  }
}

export const getPostsByAuthorHandler: RequestHandler = async (req, res) => {
  try {
    const { authorId } = req.params
    const { page = 1, limit = 10 } = req.query

    if (!authorId || typeof authorId !== 'string') {
      res.status(400).json({ error: "Author ID is required" })
      return
    }

    const author = await prisma.user.findUnique({
      where: { id: authorId },
      select: { role: true }
    })

    if (!author) {
      res.status(404).json({ error: "Author not found" })
      return
    }

    if (author.role === 'READER') {
      res.status(403).json({ error: "Readers don't have posts" })
      return
    }

    const result = await paginate(
      prisma.post,
      {
        where: { authorId, published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } }
      },
      {
        page: Number(page),
        limit: Number(limit),
      }
    )

    res.status(200).json(result)
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" })
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
      const isAuthor = post.authorId === reqUserId
      const areTheyAdmin = reqUserId !== undefined ? isAdmin(reqUserId) : false
      
      if (!isAuthor && !areTheyAdmin) {
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

    const isAuthor = post.authorId === userId

    if (!isAuthor && !isAdmin(userId)) {
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

export const updatePostHandler: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const { slug } = req.params
  const updates = req.body
  const userId = req.userId

  if (!slug) {
    res.status(400).json({ error: "Slug is required" })
    return
  }

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { slug },
      select: { authorId: true }
    })

    const isAuthor = existingPost?.authorId === userId

    if (!existingPost || (!isAuthor && !isAdmin(userId))) {
      res.status(403).json({ error: "You can only update your own posts" })
      return
    }

    if (updates.title !== undefined) {
      updates.title = updates.title.trim()
      if (!updates.title) {
        res.status(400).json({ error: "Title cannot be empty" })
        return
      }
    }

    if (updates.content !== undefined) {
      updates.content = updates.content.trim()
      if (!updates.content) {
        res.status(400).json({ error: "Content cannot be empty" })
        return
      }
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        ...(updates.title !== undefined && { title: updates.title }),
        ...(updates.content !== undefined && { content: updates.content }),
        ...(updates.published !== undefined && { published: updates.published }),
        updatedAt: new Date(),
      }
    })

    res.status(200).json(updatedPost)
    return
  } catch (error) {
    console.error("Update error: ", error)
    res.status(500).json({ error: "Failed to update post" })
    return
  }
} 
