import { test, expect } from '@playwright/test'
import { prisma } from '../../server/src/utils/prisma'
import bcrypt from 'bcryptjs'

const BASE_URL = 'http://localhost:3001/api'

// Test data
const TEST_USER = {
    email: 'user1@test.com',
    password: 'password123',
    name: 'Test User 1'
}

test.beforeEach(async () => {
    // Clear test data before each test
    await prisma.user.deleteMany({ where: { email: TEST_USER.email } })
    await prisma.refreshToken.deleteMany()
})

test.afterAll(async () => {
    // Cleanup after all tests
    await prisma.user.deleteMany({ where: { email: TEST_USER.email } })
})

test.describe('Auth API', () => {
    test('POST /signup - creates new user', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/signup`, {
            data: TEST_USER
        })
        
        expect(response.status()).toBe(201)
        const body = await response.json()
        expect(body).toHaveProperty('accessToken')
        expect(body).toHaveProperty('refreshToken')
        
        // Verify user in database
        const dbUser = await prisma.user.findUnique({ 
            where: { email: TEST_USER.email } 
        })
        expect(dbUser).toBeTruthy()
        expect(await bcrypt.compare(TEST_USER.password, dbUser!.password)).toBe(true)
    })

    test('POST /signup - rejects duplicate email', async ({ request }) => {
        // First registration (success)
        await request.post(`${BASE_URL}/signup`, {
            data: TEST_USER
        })
        
        // Second attempt (should fail)
        const response = await request.post(`${BASE_URL}/signup`, {
            data: TEST_USER
        })
        
        expect(response.status()).toBe(409)
        expect(await response.json()).toEqual({
            error: "Email already in use"
        })
    })

    test('POST /login - authenticates valid user', async ({ request }) => {
        // Create test user first
        await prisma.user.create({
            data: {
                ...TEST_USER,
                password: await bcrypt.hash(TEST_USER.password, 10)
            }
        })
        
        const response = await request.post(`${BASE_URL}/login`, {
            data: {
                email: TEST_USER.email,
                password: TEST_USER.password
            }
        })
        
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toHaveProperty('accessToken')
        expect(body).toHaveProperty('refreshToken')
    })

    test('POST /login - rejects invalid credentials', async ({ request }) => {
        const testCases = [
            { payload: { email: 'nonexistent@test.com', password: 'wrong' }, expectedStatus: 404 },
            { payload: { email: TEST_USER.email, password: 'wrongpassword' }, expectedStatus: 401 },
            { payload: { email: '', password: '' }, expectedStatus: 400 }
        ]
        
        for (const { payload, expectedStatus } of testCases) {
            const response = await request.post(`${BASE_URL}/login`, {
                data: payload
            })
            expect(response.status()).toBe(expectedStatus)
        }
    })

    test('POST /logout - revokes refresh token', async ({ request }) => {
        // Create test user and token
        const user = await prisma.user.create({
            data: {
                ...TEST_USER,
                password: await bcrypt.hash(TEST_USER.password, 10),
                refreshTokens: {
                    create: { token: 'test-refresh-token', expiresAt: new Date(Date.now() + 86400000) }
                }
            },
            include: { refreshTokens: true }
        })
        
        const response = await request.post(`${BASE_URL}/logout`, {
            data: { refreshToken: 'test-refresh-token' }
        })
        
        expect(response.status()).toBe(204)
        
        // Verify token was deleted
        const token = await prisma.refreshToken.findUnique({
            where: { id: user.refreshTokens[0].id }
        })
        expect(token).toBeNull()
    })

    test('POST /refresh-token - issues new tokens', async ({ request }) => {
        // Create test user and valid token
        const expiresAt = new Date(Date.now() + 86400000) // 1 day from now
        const user = await prisma.user.create({
            data: {
                ...TEST_USER,
                password: await bcrypt.hash(TEST_USER.password, 10),
                refreshTokens: {
                    create: { token: 'valid-token', expiresAt }
                }
            }
        })
        
        const response = await request.post(`${BASE_URL}/refresh-token`, {
            data: { refreshToken: 'valid-token' }
        })
        
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toHaveProperty('accessToken')
        expect(body).toHaveProperty('refreshToken')
        
        // Verify old token was deleted
        const tokens = await prisma.refreshToken.findMany({
            where: { userId: user.id }
        })
        expect(tokens).toHaveLength(1)
        expect(tokens[0].token).not.toBe('valid-token')
    })
})

test.describe('Rate Limiting', () => {
    test('blocks after too many login attempts', async ({ request }) => {
        // Create test user
        await prisma.user.create({
            data: {
                ...TEST_USER,
                password: await bcrypt.hash(TEST_USER.password, 10)
            }
        })
    
        // Make 3 failed attempts (limit is 3 per hour)
        for (let i = 0; i < 3; i++) {
            const response = await request.post(`${BASE_URL}/login`, {
                data: { email: TEST_USER.email, password: 'wrong-password' }
            })
            expect(response.status()).toBe(401)
        }
    
        // 4th attempt should be blocked
        const blockedResponse = await request.post(`${BASE_URL}/login`, {
            data: { email: TEST_USER.email, password: 'wrong-password' }
        })
        expect(blockedResponse.status()).toBe(429)
    })
})
