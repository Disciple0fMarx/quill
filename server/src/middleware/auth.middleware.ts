import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest, JwtPayload } from '../types'

export const verifyAccessToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: "No token provided" })
    return
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" })
      return
    }

    req.userId = (decoded as JwtPayload).userId
    next()
  })
}
