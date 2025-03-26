import type { User, Project, Prompt } from "@prisma/client";

export type UserWithoutPassword = Omit<User, "password">;
export type CreateUserInput = {
    email: string;
    password: string;
};
export type LoginInput = CreateUserInput;

export type CreateProjectInput = {
    description: string;
    userId: string;
};

export type CreatePromptInput = {
    content: string;
    projectId: string;
};

export type JwtPayload = {
    sub: string;
    email: string;
    iat: number;
    exp: number;
};

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
} 