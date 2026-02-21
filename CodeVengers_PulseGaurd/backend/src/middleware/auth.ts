import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import { Role } from "../types/user";

// Extend Express Request object to include user
declare global {
    namespace Express {
        interface Request {
            user?: import("../types/user").User;
        }
    }
}

/**
 * Dummy auth middleware.
 * In a real app, you would verify a JWT from the Authorization header.
 * Here, we use the `x-user-id` header to mock the logged-in user.
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
        // If not required by strict checks, we might let them pass, 
        // but the prompt wants me to enforce auth for these features
        return res.status(401).json({ error: "Unauthorized. Missing x-user-id header." });
    }

    let user = await userRepository.findById(userId);
    if (!user) {
        user = { id: userId, name: "Frontend User", email: "user@example.com", role: "normal" };
        await userRepository.createUser(user);
    }

    req.user = user;
    next();
};

export const requireRole = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized." });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ error: `Forbidden. Requires ${role} role.` });
        }
        next();
    };
};
