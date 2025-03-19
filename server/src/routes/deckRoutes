import { Router } from 'express';
import { getAllDecks, getDeckById, createDeck, updateDeck, deleteDeck } from '../controllers/deckController';

const router = Router();

router.get('/', getAllDecks);
router.get('/:id', getDeckById);
router.post('/', createDeck);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);

export default router;
