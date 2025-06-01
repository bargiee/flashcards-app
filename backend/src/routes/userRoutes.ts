import { Router } from 'express';
import { getMe, getAllUsers } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get currently authenticated user's details
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The authenticated user's data (excluding password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found (should not happen if authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/me', getMe);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of all users (requires admin role)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', getAllUsers);

export default router;
