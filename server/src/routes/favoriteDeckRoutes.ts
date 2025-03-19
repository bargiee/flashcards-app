import { Router } from 'express';
import { getFavoriteDecksByUser, addFavoriteDeck, removeFavoriteDeck } from '../controllers/favoriteDeckController';

const router = Router();

router.post('/', addFavoriteDeck);
router.get('/:userId', getFavoriteDecksByUser);
router.delete('/', removeFavoriteDeck);

export default router;
