import { APIRequestContext } from '@playwright/test'
import { prisma } from '../../server/src/utils/prisma'
import bcrypt from 'bcryptjs'

type TestUser = {
    email: string
    password: string
    name: string
}

export const TEST_USER: TestUser = {
    email: 'user1@test.com',
    password: 'password123',
    name: 'Test User 1'
}

export async function createTestUser(user: TestUser = TEST_USER) {
    return await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10)
        }
    })
}

export async function loginViaAPI(
    request: APIRequestContext,
    credentials: { email: string, password: string } = TEST_USER
) {
    return await request.post('http://localhost:3001/login', {
        data: credentials
    })
}
