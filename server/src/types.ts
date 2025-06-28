import { Request } from "express"

// Auth Request Types
export type SignupRequest = {
  email: string
  password: string
  name?: string
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
  error?: never
} | { 
  error: string
  accessToken?: never
  refreshToken?: never
}

// JWT Payload
export type JwtPayload = {
  userId: string
}
