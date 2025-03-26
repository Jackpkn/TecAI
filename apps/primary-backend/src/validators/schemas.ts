import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = createUserSchema;

export const createProjectSchema = z.object({
    description: z.string().min(1, "Description is required"),
    userId: z.string().uuid("Invalid user ID"),
    prompt: z.object({
        create: z.array(
            z.object({
                content: z.string().min(1, "Prompt content is required")
            })
        ).optional()
    }).optional()
});

export const createPromptSchema = z.object({
    content: z.string().min(1, "Content is required"),
    projectId: z.string().uuid("Invalid project ID"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema> & {
    userId: string;
};
export type CreatePromptInput = z.infer<typeof createPromptSchema>; 