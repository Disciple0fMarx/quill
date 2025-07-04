import { Router } from 'express'
import { 
    createPostHandler,
    getPostsHandler,
    getUserPostsHandler,
    getPostBySlugHandler,
    deletePostHandler,
    updatePostHandler,
    getPostsByAuthorHandler,
} from '../../handlers/post.handlers'
import { verifyAccessToken } from '../../middleware/auth.middleware'

const postsRouter = Router()

postsRouter.post('/create', verifyAccessToken, createPostHandler)
postsRouter.get('/all', getPostsHandler)
postsRouter.get('/user/:authorId', getPostsByAuthorHandler)
postsRouter.get('/user', verifyAccessToken, getUserPostsHandler)
postsRouter.get('/:slug', getPostBySlugHandler)
postsRouter.delete('/:postId', verifyAccessToken, deletePostHandler)
postsRouter.patch('/:slug', verifyAccessToken, updatePostHandler)

export default postsRouter
