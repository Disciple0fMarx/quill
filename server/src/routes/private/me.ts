// server/src/routes/private/me.ts
import { Router } from 'express'
import { verifyAccessToken } from '../../middleware/auth.middleware'
import { meHandler } from '../../handlers/me.handlers'

const meRouter = Router()

meRouter.get('/', verifyAccessToken, meHandler)

export default meRouter
