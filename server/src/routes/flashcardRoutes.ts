import { Router } from 'express';
import {
    getAllFlashcards,
    getFlashcardById,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
} from '../controllers/flashcardController';

const router = Router();

router.get('/', getAllFlashcards);
router.get('/:id', getFlashcardById);
router.post('/', createFlashcard);
router.put('/:id', updateFlashcard);
router.delete('/:id', deleteFlashcard);

export default router;
