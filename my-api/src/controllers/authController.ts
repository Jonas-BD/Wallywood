import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken.js";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User is not authenticated or token is missing'})
    }
    return res.status(200).json(req.user)
}