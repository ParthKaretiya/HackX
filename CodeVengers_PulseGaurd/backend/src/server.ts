/**
 * PulseGuard Backend
 * ------------------
 * How to run:
 * 1. cd backend
 * 2. npm install
 * 3. cp .env.example .env (and set GEMINI_API_KEY)
 * 4. npm run dev
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import scanRouter from "./routes/scan";
import parentRouter from "./routes/parent";
import childRouter from "./routes/child";
import authStubRouter from "./routes/authStub";
import safetyRouter from "./routes/safety";

const app = express();

app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Add frontend URLs here
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-user-id", "Authorization"],
}));

app.use(express.json());

// Routes
app.use("/api/scan", scanRouter);
app.use("/api/parent", parentRouter);
app.use("/api/child", childRouter);
app.use("/api", authStubRouter);
app.use("/api", safetyRouter);

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "PulseGuard API is running." });
});

app.listen(env.PORT, () => {
    console.log(`🛡️ PulseGuard Backend running on http://localhost:${env.PORT}`);
});
