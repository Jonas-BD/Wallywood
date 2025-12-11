import { Router } from "express";
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from "../controllers/genreController";

const router = Router()

router.get('/', getRecords)
router.get('/:id', getRecord)
router.post('/', createRecord)
router.put('/:id', updateRecord)
router.delete('/:id', deleteRecord)

export const genreRoutes = router