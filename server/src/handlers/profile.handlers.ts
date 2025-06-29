import { RequestHandler, Response } from 'express'
import { prisma } from '../utils/prisma'
import { AuthenticatedRequest } from '../types'

export const getProfileHandler: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { 
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true
        }
        })

        if (!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        res.status(200).json(user)
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" })
    }
}
