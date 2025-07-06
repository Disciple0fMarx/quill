import { Router } from 'express'
import { verifyAccessToken } from '../../middleware/auth.middleware'
import { authorizeAdmin } from '../../middleware/admin.middleware'
import {
    submitApplicationHandler,
    getPendingApplicationsHandler,
    processApplicationHandler
} from '../../handlers/application.handlers'

const applicationsRouter = Router()

applicationsRouter.post('/', verifyAccessToken, submitApplicationHandler)
applicationsRouter.get('/pending', verifyAccessToken, authorizeAdmin, getPendingApplicationsHandler)
applicationsRouter.patch('/:id/process', verifyAccessToken, authorizeAdmin, processApplicationHandler)

export default applicationsRouter
