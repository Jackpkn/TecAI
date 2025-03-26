import express from "express";
import cors from "cors";
import { config } from "./config/config";
import authRouter from "./routes/auth.routes";
import projectRouter from "./routes/project.routes";
import { generalLimiter, rateLimitErrorHandler } from "./middleware/rateLimiter";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Routes
app.use('/api', authRouter);
app.use('/api', projectRouter);

// Health check (without rate limiting)
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Rate limit error handler
app.use(rateLimitErrorHandler);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message: config.env === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
  console.log(`Environment: ${config.env}`);
});



