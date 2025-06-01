import { Router } from 'express';
import {
    getProgressByUser,
    createOrUpdateProgress,
    deleteProgress,
} from '../controllers/progressController';

const router = Router();

/**
 * @swagger
 * /api/progress:
 *   get:
 *     summary: Retrieve learning progress for authenticated user (all flashcards)
 *     tags:
 *       - Progress
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of progress entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Progress'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/user/', getProgressByUser);

/**
 * @swagger
 * /api/progress:
 *   post:
 *     summary: Create or update learning progress for a flashcard
 *     tags:
 *       - Progress
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flashcardId
 *               - known
 *             properties:
 *               flashcardId:
 *                 type: integer
 *                 example: 15
 *               known:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       204:
 *         description: Progress created or updated successfully
 *       400:
 *         description: Missing or invalid flashcardId / known
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', createOrUpdateProgress);

/**
 * @swagger
 * /api/progress/{id}:
 *   delete:
 *     summary: Delete a specific progress entry by its ID
 *     tags:
 *       - Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the progress record to delete
 *     responses:
 *       200:
 *         description: Progress entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Progress 22 deleted"
 *       404:
 *         description: Progress record not found or not owned by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', deleteProgress);

export default router;
