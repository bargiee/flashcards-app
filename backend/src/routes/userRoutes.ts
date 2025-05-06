import { Router } from 'express';
import { getMe, getAllUsers } from '../controllers/userController';

const router = Router();

router.get('/me', getMe);

router.get('/', getAllUsers); //todo admin middleware

export default router;
