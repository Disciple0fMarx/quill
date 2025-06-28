import express, { Request, Response } from 'express'
import cors from 'cors'
import { prisma } from './utils/prisma'

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Quill Backend (TypeScript)')
})

app.get('/posts', async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
