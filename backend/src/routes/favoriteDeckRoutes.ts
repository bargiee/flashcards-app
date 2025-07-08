import { Router } from 'express';
import {
    getFavoriteDecksByUser,
    addFavoriteDeck,
    removeFavoriteDeck,
} from '../controllers/favoriteDeckController';

const router = Router();

/**
 * @swagger
 * /api/favorite-decks:
 *   get:
 *     summary: Retrieve all favorite decks for the authenticated user
 *     tags:
 *       - FavoriteDeck
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of favorite deck records (includes deckId and createdAt)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteDeck'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', getFavoriteDecksByUser);

/**
 * @swagger
 * /api/favorite-decks:
 *   post:
 *     summary: Add a deck to the authenticated user's favorites
 *     tags:
 *       - FavoriteDeck
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deckId
 *             properties:
 *               deckId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Favorite deck record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteDeck'
 *       400:
 *         description: Missing or invalid deckId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Deck is already in favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', addFavoriteDeck);

/**
 * @swagger
 * /api/favorite-decks:
 *   delete:
 *     summary: Remove a deck from the authenticated user's favorites
 *     tags:
 *       - FavoriteDeck
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deckId
 *             properties:
 *               deckId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Favorite deck removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Removed from favorites"
 *       400:
 *         description: Missing or invalid deckId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Favorite deck record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/', removeFavoriteDeck);

export default router;
