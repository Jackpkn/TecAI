import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected successfully!");
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
})();

export default redisClient;
