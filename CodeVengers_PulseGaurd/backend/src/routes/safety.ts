import { Router, Request, Response } from "express";
import { isSafeHost } from "../services/safetyChecker";

const router = Router();

router.post("/check-url", (req: Request, res: Response): void => {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
        res.status(400).json({ error: "Please provide a valid 'url' field in the JSON body." });
        return;
    }

    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        // Evaluate correctness purely by using the manual string logic against SAFE_DOMAINS
        const isSafe = isSafeHost(hostname);

        res.status(200).json({
            url,
            hostname,
            isSafe,
            reason: isSafe ? "Matched SAFE_DOMAINS prefix/suffix/exact" : "Domain not found in trusted list."
        });
    } catch (error) {
        // If new URL(url) throws because it's completely invalid text
        res.status(400).json({ error: "Invalid URL string provided. Could not parse hostname." });
    }
});

export default router;
