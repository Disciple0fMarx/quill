// import { router } from '../../utils/router'
import { Router } from 'express'
import { 
    signupHandler,
    loginHandler,
    logoutHandler,
    refreshTokenHandler,
} from '../../handlers/auth.handlers'
import { authRateLimiter, loginRateLimiter } from '../../middleware/rateLimiter'

const authRouter = Router()

authRouter.post('/signup', authRateLimiter, signupHandler)
authRouter.post('/login', loginRateLimiter, loginHandler)
authRouter.post('/logout', logoutHandler)
authRouter.post('/refresh-token', refreshTokenHandler)

export default authRouter
