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

/**
 * @swagger
 * /api/decks:
 *   get:
 *     summary: Retrieve all decks belonging to the authenticated user
 *     tags:
 *       - Deck
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of Deck objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deck'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', getAllDecks);

/**
 * @swagger
 * /api/decks/{id}:
 *   get:
 *     summary: Retrieve a deck by its ID (must belong to the authenticated user)
 *     tags:
 *       - Deck
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the deck to retrieve
 *     responses:
 *       200:
 *         description: A single Deck object (including no nested flashcards here)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deck'
 *       404:
 *         description: Deck not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id', getDeckById);

/**
 * @swagger
 * /api/decks:
 *   post:
 *     summary: Create a new deck for the authenticated user
 *     tags:
 *       - Deck
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Biology - Chapter 2"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: "Flashcards about evolution"
 *     responses:
 *       201:
 *         description: Deck created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deck'
 *       400:
 *         description: Name field is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', createDeck);

/**
 * @swagger
 * /api/decks/{id}:
 *   put:
 *     summary: Update a deck's name and/or synchronize its flashcards
 *     tags:
 *       - Deck
 *       - Flashcard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the deck to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Renamed Deck Title"
 *               flashcards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: "Include existing ID to update that flashcard, omit to create a new one"
 *                     term:
 *                       type: string
 *                       example: "New Term"
 *                     definition:
 *                       type: string
 *                       example: "New Definition"
 *     responses:
 *       204:
 *         description: Deck updated successfully (no content)
 *       400:
 *         description: Bad request (e.g. invalid payload)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Deck not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id', updateDeck);

/**
 * @swagger
 * /api/decks/{id}:
 *   delete:
 *     summary: Delete a deck and all its flashcards
 *     tags:
 *       - Deck
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the deck to delete
 *     responses:
 *       200:
 *         description: Deck deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deck 3 deleted"
 *       404:
 *         description: Deck not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', deleteDeck);

/**
 * @swagger
 * /api/decks/{id}/flashcards:
 *   get:
 *     summary: Retrieve all flashcards for a given deck
 *     tags:
 *       - Flashcard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the deck
 *     responses:
 *       200:
 *         description: An array of Flashcard objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Deck not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id/flashcards', getFlashcardsForDeck);

export default router;
