import { Router } from "express";
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from "../controllers/posterController";
import { authorizeRole } from "../middleware/authorizeRole";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router()

router.get('/', getRecords)
router.get('/:id', getRecord)
router.post('/', authenticateToken, authorizeRole('ADMIN'), createRecord)
router.put('/:id', authenticateToken, authorizeRole('ADMIN'), updateRecord)
router.delete('/:id', authenticateToken, authorizeRole('ADMIN'), deleteRecord)

export const posterRoutes = router