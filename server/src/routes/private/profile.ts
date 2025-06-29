import { Router } from 'express'
import { verifyAccessToken } from '../../middleware/auth.middleware'
import { getProfileHandler } from '../../handlers/profile.handlers'

const profileRouter = Router()

profileRouter.get('/', verifyAccessToken, getProfileHandler)

export default profileRouter
