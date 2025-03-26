import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import type { JwtPayload as BaseJwtPayload } from "jsonwebtoken";



export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                error: "No token provided",
            });
        }

        const token = authHeader.split(" ")[1];// ['Bearer ', 'token']

        const decoded = jwt.verify(token!, config.jwt.secret) as BaseJwtPayload;
        req.user = {
            sub: decoded.sub as string,
            email: decoded.email as string,
            iat: decoded.iat!,
            exp: decoded.exp!,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: "Invalid token",
        });
    }
};
