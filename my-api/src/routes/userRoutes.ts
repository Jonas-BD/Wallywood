import { Router } from "express";
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from "../controllers/userController.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = Router()
router.get('/', getRecords)
router.get('/:id', getRecord)
router.post('/', authorizeRole('ADMIN'), createRecord)
router.put('/:id', authorizeRole('ADMIN'), updateRecord)
router.delete('/:id', authorizeRole('ADMIN'), deleteRecord)

export const userRoutes = router