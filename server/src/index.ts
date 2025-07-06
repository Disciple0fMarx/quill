import express, { Request, Response } from 'express'
import cors from 'cors'
import { prisma } from './utils/prisma'
import authRouter from './routes/public/auth'
import meRouter from './routes/private/me'
import profileRouter from './routes/private/profile'
import postsRouter from './routes/private/posts'
import applicationsRouter from './routes/private/applications'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
}))
app.use(express.json())

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Quill Backend (TypeScript)')
})

app.get('/posts', async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

app.use('/auth', authRouter)
app.use('/me', meRouter)
app.use('/profile', profileRouter)
app.use('/posts', postsRouter)
app.use('/applications', applicationsRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
