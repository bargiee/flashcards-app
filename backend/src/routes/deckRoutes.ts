import { Router } from 'express';
import {
    getAllDecks,
    getDeckById,
    createDeck,
    updateDeck,
    deleteDeck,
    getFlashcardsForDeck,
} from '../controllers/deckController';

const router = Router();

router.get('/', getAllDecks);
router.get('/:id', getDeckById);
router.post('/', createDeck);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);
router.get('/:id/flashcards', getFlashcardsForDeck);

export default router;
