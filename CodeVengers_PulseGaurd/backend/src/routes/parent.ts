import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { userRepository } from "../repositories/userRepository";
import { scanRepository } from "../repositories/scanRepository";

const router = Router();

// GET /api/parent/key
router.get("/key", requireAuth, requireRole("parent"), async (req, res) => {
    const user = req.user!;

    if (!user.parentKey) {
        const parentKey = userRepository.generateParentKey();
        await userRepository.updateUser(user.id, { parentKey });
        return res.json({ parentKey });
    }

    return res.json({ parentKey: user.parentKey });
});

// GET /api/parent/children
router.get("/children", requireAuth, requireRole("parent"), async (req, res) => {
    const user = req.user!;
    const children = await userRepository.findChildrenByParentId(user.id);

    const formattedChildren = children.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email
    }));

    return res.json({ children: formattedChildren });
});

// GET /api/parent/scans
router.get("/scans", requireAuth, requireRole("parent"), async (req, res) => {
    const user = req.user!;

    const children = await userRepository.findChildrenByParentId(user.id);
    const childIds = children.map(c => c.id);

    // Scans for parent + children
    const userIdsToFetch = [user.id, ...childIds];
    const scans = await scanRepository.findByUserIds(userIdsToFetch);

    // Map to include userName and role
    const formattedScans = await Promise.all(scans.map(async scan => {
        const scanUser = await userRepository.findById(scan.userId);
        return {
            id: scan.id,
            userId: scan.userId,
            userName: scanUser?.name || "Unknown User",
            role: scanUser?.role || "normal",
            input: scan.input,
            type: scan.type,
            riskCategory: scan.riskCategory,
            riskScore: scan.riskScore,
            createdAt: scan.createdAt
        };
    }));

    // Sort by newest first
    formattedScans.sort((a, b) => b.createdAt - a.createdAt);

    return res.json({ scans: formattedScans });
});

export default router;
