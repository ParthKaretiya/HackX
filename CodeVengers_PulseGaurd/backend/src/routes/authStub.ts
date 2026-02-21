import { Router, Request, Response, NextFunction } from "express";
import { requireAuth } from "../middleware/auth";
import { userRepository } from "../repositories/userRepository";

const router = Router();

// Used for frontend to verify who they are currently
router.get("/me", requireAuth, (req, res) => {
    return res.json({ user: req.user });
});

// A dummy route just to see the available mock users
router.get("/users", async (req, res) => {
    const users = await userRepository.getAll();
    return res.json({ users });
});

export default router;
