import { Router } from 'express';
import userRoutes from './userRoutes';
import deckRoutes from './deckRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/decks', deckRoutes);

export default router;
