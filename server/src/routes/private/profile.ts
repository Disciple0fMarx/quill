import { router } from '../../utils/router'
import { verifyAccessToken } from '../../middleware/auth.middleware'
import { getProfileHandler } from '../../handlers/profile.handlers'

router.get('/profile', verifyAccessToken, getProfileHandler)

export default router
