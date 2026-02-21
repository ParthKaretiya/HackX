import { Router, Request, Response, NextFunction } from "express";
import { ScanRequestSchema } from "../types/scan";
import { analyzeRiskWithGemini } from "../services/scanService";
import { requireAuth } from "../middleware/auth";
import { scanRepository } from "../repositories/scanRepository";

const router = Router();

// Assuming frontend sends x-user-id header to identify
router.post("/", requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const parseResult = ScanRequestSchema.safeParse(req.body);

        if (!parseResult.success) {
            res.status(400).json({
                error: "Invalid request data",
                details: parseResult.error.format()
            });
            return;
        }

        const { input, type } = parseResult.data;
        const user = req.user!; // Injected by requireAuth

        const scanResult = await analyzeRiskWithGemini(input, type);

        // Save into repository
        const savedScan = await scanRepository.saveScan({
            id: Math.random().toString(36).substring(2, 10),
            userId: user.id,
            input,
            type,
            createdAt: Date.now(),
            ...scanResult
        });

        res.status(200).json(savedScan);

    } catch (error) {
        console.error("Route error (/api/scan):", error);
        res.status(500).json({ error: "Internal server error during scan." });
    }
});

export default router;
