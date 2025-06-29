import { RequestHandler } from "express"
import { AuthenticatedRequest } from "../types"
import { prisma } from "../utils/prisma"

export const meHandler: RequestHandler = async (req: AuthenticatedRequest, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            }
        })

        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        res.json(user)
        return
    } catch (error) {
        console.error('Error in /me:', error)
        res.status(500).json({ error: 'Internal server error' })
        return
    }
}