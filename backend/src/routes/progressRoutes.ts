import { Router } from 'express';
import {
    getProgressByUser,
    createOrUpdateProgress,
    deleteProgress,
} from '../controllers/progressController';

const router = Router();

router.get('/user/', getProgressByUser);
router.post('/', createOrUpdateProgress);
router.delete('/:id', deleteProgress);

export default router;
