import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";
import { isAdmin } from "../utils/adminCheck";

export const authorizeAdmin = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.userId) throw new Error('Unauthorized')
        
        const AreTheyAdmin = await isAdmin(req.userId)
        if (!AreTheyAdmin) throw new Error('Admin only')

        next()
    } catch (err) {
        res.status(403).json({
            error: 'Authorization failed',
            details: err instanceof Error ? err.message : String(err),
        })
        return
    }
}