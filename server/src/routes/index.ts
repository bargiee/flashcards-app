import { Router } from 'express';
import userRoutes from './userRoutes';
import deckRoutes from './deckRoutes';
import flashcardRoutes from './flashcardRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/decks', deckRoutes);
router.use('/flashcards', flashcardRoutes);

export default router;
