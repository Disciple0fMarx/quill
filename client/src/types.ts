export type User = {
  id: string
  email: string
  name: string | null
  role?: 'READER' | 'AUTHOR'
  createdAt?: Date
}

export type Post = {
  id: string
  title: string
  slug?: string
  content: string
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
  author: User
}

export type SignupResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

