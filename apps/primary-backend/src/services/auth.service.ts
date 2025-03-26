
import jwt from "jsonwebtoken";
import { prismaClient } from "db/client";
import { config } from "../config/config";
import type { CreateUserInput, LoginInput } from "../validators/schemas";
import argon2 from "argon2";

export class AuthService {
    async register(input: CreateUserInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: { email: input.email },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await argon2.hash(input.password)

        const user = await prismaClient.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
            },
        });

        const token = this.generateToken(user);

        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        };
    }

    async login(input: LoginInput) {
        const user = await prismaClient.user.findUnique({
            where: { email: input.email },
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValidPassword = await argon2.verify(user.password, input.password,);

        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        const token = this.generateToken(user);

        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        };
    }
    private generateToken(user: { id: string; email: string }): string {
        const payload = {
            sub: user.id,
            email: user.email,
        };

        const options: jwt.SignOptions = {
            expiresIn: config.jwt.expiresIn as number,
        };

        return jwt.sign(
            payload,
            config.jwt.secret,
            options
        );
    }

} 