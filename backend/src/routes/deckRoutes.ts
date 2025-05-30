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
router.post('/', createDeck);

router.get('/:id/flashcards', getFlashcardsForDeck);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);
router.get('/:id', getDeckById);

export default router;
