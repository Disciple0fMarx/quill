import { AuthenticatedRequest } from "../types"
import { Response } from "express"
import { prisma } from "../utils/prisma"

export const submitApplicationHandler = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    try {
        const { message } = req.body

        const application = await prisma.authorApplication.create({
            data: {
                userId: req.userId,
                message,
                status: 'PENDING',
            },
        })

        res.status(201).json(application)
        return
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit application' })
        return
    }
}

export const getPendingApplicationsHandler = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    try {
        const applications = await prisma.authorApplication.findMany({
            where: {
                status: 'PENDING',
            },
            include: {
                user: { select: { email: true, name: true} },
                reviewedBy: { select: { id: true, email: true, name: true } },
            },
            orderBy: {
                submittedAt: 'desc',
            },
        })

        res.status(200).json(applications)
        return
    } catch (err) {
        res.status(500).json({ error: 'Failed to get pending applications' })
        return
    }
}

export const processApplicationHandler = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    const { id } = req.params
    const { action, notes, userId } = req.body

    try {
        const result = await prisma.$transaction(async (tx) => {
            const updatedApp = await tx.authorApplication.update({
                where: { id },
                data: {
                    status: action,
                    reviewedAt: new Date(),
                    reviewedById: req.userId,
                    notes,
                }
            })

            if (action === 'APPROVED') {
                await tx.user.update({
                    where: { id: userId },
                    data: { role: 'AUTHOR' },
                })
            }

            return updatedApp
        })

        res.status(200).json(result)
        return
    } catch (err) {
        res.status(500).json({ error: 'Failed to process application' })
        return
    }
}
