import rateLimit from 'express-rate-limit'

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5,                    // Limit each IP to 5 requests per window
    standardHeaders: true,     // Return rate limit info in headers
    legacyHeaders: false,      // Disable deprecated headers
    message: 'Too many attempts, please try again later',
    handler: (_req, res) => {
        res.status(429).json({
        error: 'Too many login attempts',
        message: 'Please try again after 15 minutes',
        })
    }
})

// For login-specific stricter limits
export const loginRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // 1 hour
    max: 3,                    // Limit each IP to 3 requests per window
    standardHeaders: true,     // Return rate limit info in headers
    legacyHeaders: false,      // Disable deprecated headers
    handler: (_req, res) => {
        res.status(429).json({
        error: 'Account temporarily locked',
        message: 'Too many failed login attempts. Try again in 1 hour.'
        })
    }
})
