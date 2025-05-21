import { Router } from 'express';
import { importFlashcards } from '../controllers/importController';

const router = Router();
router.post('/', importFlashcards);

export default router;
