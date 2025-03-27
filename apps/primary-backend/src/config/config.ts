import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("24h"),
  DATABASE_URL: z.string(),
});

const env = envSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  port: parseInt(env.PORT, 10),
  jwt: {
    secret: env.JWT_SECRET as string,
    expiresIn: env.JWT_EXPIRES_IN as string | number, // Explicitly allow string | number
  },
  database: {
    url: env.DATABASE_URL,
  },
} as const;
