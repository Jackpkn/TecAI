import rateLimit from 'express-rate-limit';
import type { Request, Response, NextFunction } from 'express';

// General API rate limiter
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for auth routes
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many login attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Custom limiter for specific routes
export const createCustomLimiter = (windowMs: number, max: number, message: string) => {
    return rateLimit({
        windowMs,
        max,
        message,
        standardHeaders: true,
        legacyHeaders: false,
    });
};

// Error handler for rate limit errors
export const rateLimitErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'RateLimitError') {
        return res.status(429).json({
            success: false,
            error: err.message,
        });
    }
    next(err);
}; 