import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimiter';

const authRouter: Router = Router();
// Controllers
const authController = new AuthController();

// Routes with rate limiting
authRouter.post("/auth/register", authLimiter, authController.register);
authRouter.post("/auth/login", authLimiter, authController.login);

export default authRouter;