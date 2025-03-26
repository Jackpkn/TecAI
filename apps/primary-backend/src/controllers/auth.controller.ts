import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { createUserSchema, loginSchema } from "../validators/schemas";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = createUserSchema.parse(req.body);
            const result = await this.authService.register(input);
            res.status(201).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = loginSchema.parse(req.body);
            const result = await this.authService.login(input);
            res.json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };
} 