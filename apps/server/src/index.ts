import "dotenv/config";
import cors from "cors";
import express from "express";
import { auth } from "@cloudCB/auth";
import { toNodeHandler } from "better-auth/node";
import { authMiddleware } from "./middleware/auth";
import notesRouter from "./routes/notes";
import notebooksRouter from "./routes/notebooks";
import tagsRouter from "./routes/tags";
import shareRouter from "./routes/share";
import publicShareRouter from "./routes/public-share";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CORS_ORIGIN || "http://localhost:5173",
        "http://localhost:5173",
      ];

      // Allow Vercel preview URLs
      if (origin && origin.includes("vercel.app")) {
        callback(null, true);
      } else if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Handle preflight requests
app.options("*", cors());

// Auth routes (no auth middleware needed)
app.use("/api/auth", toNodeHandler(auth));

// Public routes (no auth required)
app.use("/api/public/share", publicShareRouter);

// Health check
app.get("/", (_req, res) => {
  res.status(200).json({ status: "OK", message: "CloudCB API Server" });
});

// Protected API routes
app.use("/api/notes", authMiddleware, notesRouter);
app.use("/api/notebooks", authMiddleware, notebooksRouter);
app.use("/api/tags", authMiddleware, tagsRouter);
app.use("/api/share", authMiddleware, shareRouter);

// Error handling middleware
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});
