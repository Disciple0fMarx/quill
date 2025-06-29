import { Request } from "express"

// Auth Request Types
export type SignupRequest = {
  email: string
  password: string
  name: string
}

export type LoginRequest = {
  email: string
  password: string
}


export interface AuthenticatedRequest extends Request {
  userId?: string  // Matches JwtPayload.userId
}

// Response Types
export type AuthResponse = { 
  accessToken: string
  refreshToken: string
  user?: {
    id: string
    email: string
    name?: string | null
    role?: 'READER' | 'AUTHOR'
    createdAt?: Date
  }
  error?: never
} | {
  error: string
  accessToken?: never
  refreshToken?: never
  user?: never
}

// JWT Payload
export type JwtPayload = {
  userId: string
}
