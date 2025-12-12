import { Router } from "express";
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from "../controllers/userController.js";
import { authorizeRole } from "../middleware/authorizeRole.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router()
router.get('/', getRecords)
router.get('/:id', getRecord)
router.post('/', authenticateToken, authorizeRole('ADMIN'), createRecord)
router.put('/:id', authenticateToken, authorizeRole('ADMIN'), updateRecord)
router.delete('/:id', authenticateToken, authorizeRole('ADMIN'), deleteRecord)

export const userRoutes = router