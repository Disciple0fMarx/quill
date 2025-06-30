import { RequestHandler } from 'express'
import { SignupRequest, LoginRequest, AuthResponse } from '../types'
import { prisma } from '../utils/prisma'
import bcrypt from 'bcryptjs'
import { generateTokens, validateRefreshToken } from '../utils/tokens'
import { validateEmail, validatePassword, validateName, formatName } from '../utils/validation'

export const signupHandler: RequestHandler<{}, AuthResponse, SignupRequest> = async (req, res) => {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        res.status(400).json({ error: "All fields are required" })
        return
    }

    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
        res.status(400).json({ error: emailValidation.message || "Invalid email" })
        return
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
        res.status(400).json({ error: passwordValidation.message || "Invalid password" })
        return
    }

    const formattedName = formatName(name)
    const nameValidation = validateName(formattedName)
    if (!nameValidation.valid) {
        res.status(400).json({ error: nameValidation.message || "Invalid name" })
        return
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email: email.toLocaleLowerCase(),
                name: formattedName,
                password: hashedPassword,
            }
        })
        
        const tokens = await generateTokens(user.id)
        res.status(201).json(tokens)
        return
    } catch (error) {
        res.status(409).json({
            error: "Email already in use",
        })
        return
    }
}

export const loginHandler: RequestHandler<{}, AuthResponse, LoginRequest> = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ error: "Email and password required" })
        return
    }

    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
        res.status(400).json({ error: emailValidation.message || "Invalid email format" })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { 
                email: email.toLowerCase()
            }
        })
        if (!user) {
            // res.status(404).json({ error: "User not found" })
            res.status(401).json({ error: "Invalid email or password" })
            return 
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            // res.status(401).json({ error: "Invalid password" })
            res.status(401).json({ error: "Invalid email or password" })
            return 
        }

        const tokens = await generateTokens(user.id)
        res.status(200).json({
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
            }
        })
        return
    } catch (error) {
        res.status(500).json({ error: "Authentication failed" })
        return
    }
}

export const logoutHandler: RequestHandler = async (req, res) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        res.status(400).json({ error: "Refresh token required" })
        return
    }

    try {
        // Delete the refresh token
        const deletedToken = await prisma.refreshToken.deleteMany({
        where: { token: refreshToken }
        })

        // Handle token not found
        if (deletedToken.count === 0) {
            res.status(404).json({ error: "Token not found or already revoked" })
            return
        }

        // Successful logout (no content)
        res.status(204).end()
        return
    } catch (error) {
        res.status(500).json({ error: "Logout failed" })
        return
    }
}

export const refreshTokenHandler: RequestHandler = async (req, res) => {
    const { refreshToken } = req.body

    try {
        // Validate token
        const storedToken = await validateRefreshToken(refreshToken)

        if (!storedToken || storedToken.expiresAt < new Date()) {
            res.status(403).json({ error: "Invalid or expired token" })
            return
        }

        // Delete old token (rotation)
        await prisma.refreshToken.delete({
            where: { id: storedToken.id } 
        })

        // Generate new tokens
        const tokens = await generateTokens(storedToken.user.id)

        res.status(200).json(tokens)
        return

    } catch (error) {
        res.status(401).json({ error: "Token refresh failed" })
        return
    }
}
