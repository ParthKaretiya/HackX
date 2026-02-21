import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { userRepository } from "../repositories/userRepository";

const router = Router();

// POST /api/child/link
router.post("/link", requireAuth, requireRole("child"), async (req, res) => {
    const user = req.user!;
    const { parentKey } = req.body;

    if (!parentKey || typeof parentKey !== "string") {
        return res.status(400).json({ error: "parentKey is required" });
    }

    const parent = await userRepository.findByParentKey(parentKey);

    if (!parent) {
        return res.status(400).json({ error: "Parent key not found" });
    }

    await userRepository.updateUser(user.id, { linkedParentId: parent.id });

    return res.json({
        success: true,
        linkedParent: {
            id: parent.id,
            name: parent.name,
            email: parent.email
        }
    });
});

export default router;
