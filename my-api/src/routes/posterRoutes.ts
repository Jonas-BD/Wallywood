import { Router } from "express";
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from "../controllers/posterController";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router()

router.get('/', getRecords)
router.get('/:id', getRecord)
router.post('/', authorizeRole('ADMIN'), createRecord)
router.put('/:id', authorizeRole('ADMIN'), updateRecord)
router.delete('/:id', authorizeRole('ADMIN'), deleteRecord)

export const posterRoutes = router