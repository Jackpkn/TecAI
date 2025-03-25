import { createClient } from "redis";
export const redisClient = createClient({
  url: process.env.NODE_ENV,
});
