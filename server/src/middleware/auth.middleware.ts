import { Response, NextFunction } from 'express'
import jwt, { Jwt } from 'jsonwebtoken'
import { AuthenticatedRequest, JwtPayload } from '../types'

export const verifyAccessToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: "Authorization header must be 'Bearer [token]'" })
    return
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: "No token provided" })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired token",
      details: error instanceof Error ? error.message : String(error)
    })
    return
  }

  // jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
  //   if (err) {
  //     res.status(403).json({ error: "Invalid token" })
  //     return
  //   }

  //   req.userId = (decoded as JwtPayload).userId
  //   next()
  // })
}
