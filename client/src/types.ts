export type User = {
  id: string
  email: string
  name: string | null
  role?: 'READER' | 'AUTHOR' | 'ADMIN'
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

export type AuthorApplication = {
  id: string
  userId: string
  user?: User
  message: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: string
  reviewedBy?: User | null
  reviewedAt?: string
  reviewedById?: string
  notes?: string
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

export type Pagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: Pagination
}
