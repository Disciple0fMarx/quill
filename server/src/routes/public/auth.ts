import { router } from '../../utils/router'
import { 
    signupHandler,
    loginHandler,
    logoutHandler,
    refreshTokenHandler,
} from '../../handlers/auth.handlers'
import { authRateLimiter, loginRateLimiter } from '../../middleware/rateLimiter'

router.post('/signup', authRateLimiter, signupHandler)
router.post('/login', loginRateLimiter, loginHandler)
router.post('/logout', logoutHandler)
router.post('/refresh-token', refreshTokenHandler)

export default router
