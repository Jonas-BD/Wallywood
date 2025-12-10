import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getUserProfile } from "../controllers/authController.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = Router()

router.get('/authenticate', authenticateToken, getUserProfile)
router.get('/authorize', authenticateToken, authorizeRole('ADMIN'), getUserProfile)

export { router as authRoutes }