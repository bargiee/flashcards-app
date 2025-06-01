import { Router } from 'express';
import {
    getAllFlashcards,
    getFlashcardById,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
} from '../controllers/flashcardController';

const router = Router();

/**
 * @swagger
 * /api/flashcards:
 *   get:
 *     summary: Retrieve all flashcards belonging to the authenticated user
 *     tags:
 *       - Flashcard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of Flashcard objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', getAllFlashcards);

/**
 * @swagger
 * /api/flashcards/{id}:
 *   get:
 *     summary: Retrieve a single flashcard by its ID (must belong to a deck of the user)
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
 *         description: Numeric ID of the flashcard
 *     responses:
 *       200:
 *         description: A Flashcard object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Flashcard not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id', getFlashcardById);

/**
 * @swagger
 * /api/flashcards:
 *   post:
 *     summary: Create a new flashcard in a deck owned by the authenticated user
 *     tags:
 *       - Flashcard
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
 *               - term
 *               - definition
 *             properties:
 *               deckId:
 *                 type: integer
 *                 example: 3
 *               term:
 *                 type: string
 *                 example: 'Atom'
 *               definition:
 *                 type: string
 *                 example: 'Basic unit of matter'
 *     responses:
 *       201:
 *         description: Flashcard created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       400:
 *         description: Missing or invalid fields
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
router.post('/', createFlashcard);

/**
 * @swagger
 * /api/flashcards/{id}:
 *   put:
 *     summary: Update an existing flashcard (term and/or definition)
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
 *         description: Numeric ID of the flashcard to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               term:
 *                 type: string
 *                 example: 'Updated Term'
 *               definition:
 *                 type: string
 *                 example: 'Updated definition'
 *     responses:
 *       200:
 *         description: Flashcard updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Flashcard not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id', updateFlashcard);

/**
 * @swagger
 * /api/flashcards/{id}:
 *   delete:
 *     summary: Delete a flashcard by its ID
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
 *         description: Numeric ID of the flashcard to delete
 *     responses:
 *       200:
 *         description: Flashcard deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Flashcard 15 deleted"
 *       404:
 *         description: Flashcard not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', deleteFlashcard);

export default router;
