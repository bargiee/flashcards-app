import { Router } from 'express';
import passport from '../config/passport';

import userRoutes from './userRoutes';
import deckRoutes from './deckRoutes';
import flashcardRoutes from './flashcardRoutes';
import favoriteDeckRoutes from './favoriteDeckRoutes';
import progressRoutes from './progressRoutes';
import authRoutes from './authRoutes';
import importRoutes from './importRoutes';

const router = Router();

router.use('/auth', authRoutes);

router.use(passport.authenticate('jwt', { session: false }));
router.use('/users', userRoutes);
router.use('/decks', deckRoutes);
router.use('/flashcards', flashcardRoutes);
router.use('/favorites', favoriteDeckRoutes);
router.use('/progress', progressRoutes);
router.use('/import', importRoutes);

export default router;
