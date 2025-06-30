import { Router } from 'express'
import { 
    createPostHandler,
    getPostsHandler,
    getUserPostsHandler,
    getPostBySlugHandler,
    deletePostHandler,
} from '../../handlers/post.handlers'
import { verifyAccessToken } from '../../middleware/auth.middleware'

const postsRouter = Router()

postsRouter.post('/create', verifyAccessToken, createPostHandler)
postsRouter.get('/all', getPostsHandler)
postsRouter.get('/user', verifyAccessToken, getUserPostsHandler)
postsRouter.get('/:slug', getPostBySlugHandler)
postsRouter.delete('/:postId', verifyAccessToken, deletePostHandler)

export default postsRouter
