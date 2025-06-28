import { prisma } from '../utils/prisma'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// Generate new token pair
export const generateTokens = async (userId: string) => {
  // 1. Create JWT (15min expiry)
  const accessToken = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '15m' }
  )

  // 2. Create random refresh token (7 days expiry)
  const refreshToken = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 

  // 3. Save to database
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt
    }
  })

  return { accessToken, refreshToken }
}

// Validate refresh token
export const validateRefreshToken = async (token: string) => {
  return await prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true }
  })
}
