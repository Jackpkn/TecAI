import { prismaClient } from "db/client";
import type { CreateProjectInput } from "../validators/schemas";

export class ProjectService {
    async create(input: CreateProjectInput) {
        return prismaClient.project.create({
            data: {
                description: input.description,
                userId: input.userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    }

    async findById(id: string, userId: string) {
        return prismaClient.project.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                prompt: true,
            },
        });
    }

    async findByUserId(userId: string) {
        return prismaClient.project.findMany({
            where: {
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                prompt: true,
            },
        });
    }

    async delete(id: string, userId: string) {
        const project = await this.findById(id, userId);
        if (!project) {
            throw new Error("Project not found");
        }

        return prismaClient.project.delete({
            where: { id },
        });
    }
} 