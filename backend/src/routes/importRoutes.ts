import { Router } from 'express';
import { importFlashcards } from '../controllers/importController';

const router = Router();

/**
 * @swagger
 * /api/import:
 *   post:
 *     summary: Queue CSV import of flashcards into a specified deck
 *     tags:
 *       - Import
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - csv
 *               - deckId
 *             properties:
 *               csv:
 *                 type: string
 *                 description: "Raw CSV contents; first line header optional"
 *                 example: "term,definition\nHTML,Hypertext Markup Language\nCSS,Cascading Style Sheets"
 *               deckId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Import queued successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Import queued successfully"
 *       400:
 *         description: Missing csv or deckId in request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', importFlashcards);

export default router;
